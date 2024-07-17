import Joi from "joi";

export enum PlaylistType {
  Syncthing = 'syncthing',
  Items = 'items',
}

export interface PutPlaylist {
  name: string;
}

export const PutPlaylistSchema = Joi.object<PutPlaylist>({
  name: Joi.string().max(128),
})