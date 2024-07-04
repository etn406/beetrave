import { BeetItemFE } from "./beet-item.interface";

export interface BeetAlbumFE {
  id: number;
  added: string;
  albumartist: string;
  album: string;
  genre: string;
  year: number;
  disctotal: number;
  albumdisambig: string;
  original_year: number;
  style: string;
  items: BeetItemFE[];
}
