import Image from "next/image";
import Link from "next/link";

export default function Navbar({ }) {
  return (
    <nav className="flex gap-4 w-full border-4 border-gray-800 bg-gray-800">
      <Link 
        href={`/`}
        shallow={true}
      >
        <Image
          className="h-auto p-1"
          src="/i/logo.svg"
          alt="Home"
          width={65}
          height={0}
        />
      </Link>
      <div className="border-4 w-full border-green-600">
        <ul className="flex gap-4 h-full items-center text-white border-4 px-2">
          <li>
            Busca
          </li>
          <li>
            Oportunidades
          </li>
          <li>
            Notícias
          </li>
          <li>
            Músicas
          </li>
          <li>
            <Link 
              href={`/about`}
              shallow={true}
            >
              Sobre
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
