import { trackColumns } from '$lib/data/track-columns';
import { getZodEnumFromObjectKeys } from '$lib/utils/get-zod-enum-from-object-keys';
import { z } from 'zod';

const TrackTableColumnsEnum = getZodEnumFromObjectKeys(trackColumns);

/**
 * Zod schema for an orderBy tuple parsed from a request.
 * @example ```ts
 *   TrackOrderBySchema.parse("title".split(".")) // => ok
 *   TrackOrderBySchema.parse("title.asc".split(".")) // => ok
 * ```
 */
export const TrackOrderBySchema = z.tuple([
  TrackTableColumnsEnum,
  z.enum(['asc', 'desc']),
]).or(z.tuple([
  TrackTableColumnsEnum,
]));
