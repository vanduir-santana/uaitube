import { db } from "@/db";
import { video } from "@/db/schema";
import { sql, desc } from "drizzle-orm";

/**
 * Busca por parte do nome do vídeo. Usa o caractere % nas consultas
 * no início, entre espaços e fim da string. Assim é possível, por
 * exemplo, procurando pelo texto "dio rainbow", encontrar o título
 * "Dio - Rainbow In The Dark". O resultado da consulta é ordenado
 * pelo início do texto.
 */
export async function GET(
  request: Request,
  { params } : { params: Promise<{slug: string}> }
) {

  const text = (await params).slug;
  let filterString = text.replaceAll(' ', '%');
  filterString = `%${filterString}%`;
  const orderByString = `${text}%`;

  const videos = await db
    .select({
      id: video.id,
      title: video.title,
      duration: video.duration,
    })
    .from(video)
    .where(
      sql`UNACCENT(${video.title}) ILIKE UNACCENT(${filterString})` 
    )
    .orderBy(desc(sql`title ILIKE ${orderByString}`))
    .limit(11);

  return Response.json(videos);
}
