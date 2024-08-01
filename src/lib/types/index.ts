import { type albumTable, type trackTable } from '$lib/server/db/schema';
import type { PgColumn } from 'drizzle-orm/pg-core';

export type Album = typeof albumTable.$inferSelect;
export type Track = typeof trackTable.$inferSelect;

export type TrackOrderBy = [PgColumn, 'asc' | 'desc'];
