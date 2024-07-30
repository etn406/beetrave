import { relations } from 'drizzle-orm/relations';
import { albumTable, playlistTable, playlistTracksTable, trackTable } from './schema';

export const trackRelations = relations(trackTable, ({ one, many }) => ({
  album: one(albumTable, {
    fields: [trackTable.album_id],
    references: [albumTable.id],
  }),
  playlist_tracks: many(playlistTracksTable),
}));

export const albumRelations = relations(albumTable, ({ many }) => ({
  beets_items: many(trackTable),
}));

export const playlistTracksRelations = relations(playlistTracksTable, ({ one }) => ({
  playlist: one(playlistTable, {
    fields: [playlistTracksTable.playlist_id],
    references: [playlistTable.id],
  }),
  beets_item: one(trackTable, {
    fields: [playlistTracksTable.track_id],
    references: [trackTable.id],
  }),
}));

export const playlistRelations = relations(playlistTable, ({ many }) => ({
  playlist_tracks: many(playlistTracksTable),
}));
