
import { db } from '$lib/server/db';
import { album } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export async function load() {
  return {
    albums: await db.select().from(album).orderBy(desc(album.added)).limit(10)
  };
}