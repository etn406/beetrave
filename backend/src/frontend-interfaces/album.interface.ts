import { TrackFE } from "./track.interface";

export interface AlbumFE {
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
  tracks: TrackFE[];
}
