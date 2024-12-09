import Image from "next/image";
import Link from "next/link";
import { staticEndpoints } from "@/config";

export default function VideoItem({
  id,
  title,
  description,
} : Readonly<{
  id: string,
  title: string,
  description: string
}> ) {

  return (
    <div>
      <Link
        href={`/player/${id}`}
      >
        <Image
          src={staticEndpoints.images2(id)}
          alt="Clique para abrir"
        />
        <h3>{title}</h3>
        <p>{description}</p>
      </Link>
    </div>
  );
}
