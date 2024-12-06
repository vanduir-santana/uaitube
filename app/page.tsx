"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { endpoints } from "@/config";
import { Video } from "@/db/schema";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videos, setVideos] = useState<Video[]>([]);

  const loadRandomResult = async () => {
    const response = await fetch(endpoints.video.random);
    const result = await response.json();
    setVideos(result);
  };

  const loadFindResult = async (text: string) => {
    const response = await fetch(endpoints.video.find(text));
    const result = await response.json();
    setVideos(result);
  };

  const handleClickRandomVideos = async () => {
    setIsLoading(true);
    await loadRandomResult();
    setIsLoading(false);
  };

  const handleChangeFind = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length === 0) {
      event.preventDefault();
      return;
    }

    setIsLoading(true);
    await loadFindResult(value);
    setIsLoading(false);
  };
  
  return (
    <div className="border-4 border-violet-600 flex items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)] h-auto">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            className="rounded-2xl border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-3 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-11 sm:h-12 px-4 sm:px-5"
            onClick={handleClickRandomVideos}
          >
            <Image
              className="dark:invert w-12 h-auto"
              src="/i/logo.svg"
              alt="Vercel logomark"
              width={0}
              height={0}
            />
            Vídeos aleatórios
          </button>
          <input
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            onChange={handleChangeFind}
          />
          <button
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            onClick={() => setVideos([])}
          >
            Limpar lista
          </button>
        </div>
        <div className="w-full border-2 border-red-700">
          {isLoading && <h2>Carregando lista..</h2>}
          {videos.map((video: Video, index: number) => {
            return (
              <div key={index}>
                <p>{video.title} - {video.duration}</p>
              </div>
            );
          })}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Aprenda
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Exemplos
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Vá para nextjs.org →
        </a>
        <span>Teste Alteração Vanduir 1122</span>
      </footer>
    </div>
  );
}
