import type { Track } from '$lib/types';

export const trackColumns: Readonly<Record<keyof Track, true>> = {
  path: true,
  id: true,
  album_id: true,
  added: true,
  albumartist: true,
  albumartist_sort: true,
  albumartist_credit: true,
  genre: true,
  year: true,
  month: true,
  day: true,
  disctotal: true,
  comp: true,
  mb_albumid: true,
  mb_albumartistid: true,
  albumtype: true,
  label: true,
  mb_releasegroupid: true,
  asin: true,
  catalognum: true,
  script: true,
  language: true,
  country: true,
  albumstatus: true,
  albumdisambig: true,
  releasegroupdisambig: true,
  rg_album_gain: true,
  rg_album_peak: true,
  r128_album_gain: true,
  original_year: true,
  original_month: true,
  original_day: true,
  style: true,
  discogs_albumid: true,
  discogs_artistid: true,
  discogs_labelid: true,
  albumtypes: true,
  deleted: true,
  trackindex: true,
  tracktotal: true,
  disc: true,
  bpm: true,
  r128_track_gain: true,
  bitrate: true,
  samplerate: true,
  bitdepth: true,
  channels: true,
  rg_track_gain: true,
  rg_track_peak: true,
  length: true,
  mtime: true,
  title: true,
  artist: true,
  artist_sort: true,
  artist_credit: true,
  albumname: true,
  lyricist: true,
  composer: true,
  composer_sort: true,
  arranger: true,
  grouping: true,
  lyrics: true,
  comments: true,
  mb_trackid: true,
  mb_artistid: true,
  mb_releasetrackid: true,
  acoustid_fingerprint: true,
  acoustid_id: true,
  media: true,
  disctitle: true,
  encoder: true,
  initial_key: true,
  format: true,
  work: true,
  mb_workid: true,
  work_disambig: true,
  trackdisambig: true,
  isrc: true,
} as const;
