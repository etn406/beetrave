import { relations } from "drizzle-orm/relations";
import { album, playlist, playlist_tracks, track } from "./schema";

export const trackRelations = relations(track, ({ one, many }) => ({
  album: one(album, {
    fields: [track.album_id],
    references: [album.id]
  }),
  playlist_tracks: many(playlist_tracks),
}));

export const albumRelations = relations(album, ({ many }) => ({
  beets_items: many(track),
}));

export const playlistTracksRelations = relations(playlist_tracks, ({ one }) => ({
  playlist: one(playlist, {
    fields: [playlist_tracks.playlist_id],
    references: [playlist.id]
  }),
  beets_item: one(track, {
    fields: [playlist_tracks.track_id],
    references: [track.id]
  }),
}));

export const playlistRelations = relations(playlist, ({ many }) => ({
  playlist_tracks: many(playlist_tracks),
}));