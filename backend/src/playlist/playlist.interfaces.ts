import { IItem } from "../item/item.interface.js";

export enum PlaylistType {
  Syncthing = 'syncthing',
  Items = 'items',
}

export interface IPlaylist {
  id?: number;
  name?: string;
  type?: PlaylistType;
  items?: IItem[];
}