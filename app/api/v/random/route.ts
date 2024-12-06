import { sql } from "drizzle-orm";
import { video } from "@/db/schema";
import { db } from "@/db"; 

export async function GET() {
  const videos = await db
    .select({
      id: video.id,
      title: video.title,
      duration: video.duration,
    })
    .from(video)
    .orderBy(sql`RANDOM()`)
    .limit(11);

  return Response.json(videos);
}
