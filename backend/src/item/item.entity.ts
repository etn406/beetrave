import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import type { Album } from '../album/album.entity.js';
import type { Playlist } from '../playlist/playlist.entity.js';

@Entity('beets_item')
export class Item extends BaseEntity {
  @Column({ nullable: true })
  path?: string;

  @PrimaryColumn()
  id!: number;

  @Column({ nullable: true })
  album_id?: number;

  @Column()
  year?: number;

  @Column()
  month?: number;

  @Column()
  day?: number;

  @Column()
  track?: number;

  @Column()
  tracktotal?: number;

  @Column()
  disc?: number;

  @Column()
  disctotal?: number;

  @Column({ nullable: true })
  bpm?: number;

  @Column()
  comp?: number;

  @Column({ nullable: true })
  r128_track_gain?: number;

  @Column({ nullable: true })
  r128_album_gain?: number;

  @Column()
  original_year?: number;

  @Column()
  original_month?: number;

  @Column()
  original_day?: number;

  @Column()
  bitrate?: number;

  @Column()
  samplerate?: number;

  @Column()
  bitdepth?: number;

  @Column()
  channels?: number;

  @Column({ nullable: true })
  discogs_albumid?: number;

  @Column({ nullable: true })
  discogs_artistid?: number;

  @Column({ nullable: true })
  discogs_labelid?: number;

  @Column({ type: 'real', nullable: true })
  rg_track_gain?: number;

  @Column({ type: 'real', nullable: true })
  rg_track_peak?: number;

  @Column({ type: 'real', nullable: true })
  rg_album_gain?: number;

  @Column({ type: 'real', nullable: true })
  rg_album_peak?: number;

  @Column({ type: 'real' })
  length?: number;

  @Column({ type: 'real' })
  mtime?: number;

  @Column({ type: 'real' })
  added?: number;

  @Column()
  title?: string;

  @Column()
  artist?: string;

  @Column()
  artist_sort?: string;

  @Column()
  artist_credit?: string;

  @Column()
  albumname?: string;

  @Column()
  albumartist?: string;

  @Column()
  albumartist_sort?: string;

  @Column()
  albumartist_credit?: string;

  @Column()
  genre?: string;

  @Column()
  lyricist?: string;

  @Column()
  composer?: string;

  @Column()
  composer_sort?: string;

  @Column()
  arranger?: string;

  @Column()
  grouping?: string;

  @Column()
  lyrics?: string;

  @Column()
  comments?: string;

  @Column({ nullable: true })
  mb_trackid?: string;

  @Column({ nullable: true })
  mb_albumid?: string;

  @Column({ nullable: true })
  mb_artistid?: string;

  @Column({ nullable: true })
  mb_albumartistid?: string;

  @Column({ nullable: true })
  mb_releasetrackid?: string;

  @Column()
  albumtype?: string;

  @Column()
  label?: string;

  @Column({ nullable: true })
  acoustid_fingerprint?: string;

  @Column({ nullable: true })
  acoustid_id?: string;

  @Column()
  mb_releasegroupid?: string;

  @Column()
  asin?: string;

  @Column()
  catalognum?: string;

  @Column()
  script?: string;

  @Column()
  language?: string;

  @Column()
  country?: string;

  @Column()
  albumstatus?: string;

  @Column()
  media?: string;

  @Column()
  albumdisambig?: string;

  @Column()
  releasegroupdisambig?: string;

  @Column()
  disctitle?: string;

  @Column()
  encoder?: string;

  @Column({ nullable: true })
  initial_key?: string;

  @Column()
  format?: string;

  @Column({ nullable: true })
  style?: string;

  @Column({ nullable: true })
  work?: string;

  @Column({ nullable: true })
  mb_workid?: string;

  @Column({ nullable: true })
  work_disambig?: string;

  @Column({ nullable: true })
  trackdisambig?: string;

  @Column({ nullable: true })
  albumtypes?: string;

  @Column({ nullable: true })
  isrc?: string;

  @ManyToOne('Album', (album: Album) => album.items, { nullable: true })
  @JoinColumn({
    name: 'album_id',
  })
  album?: Album;

  @ManyToMany('Playlist', (playlist: Playlist) => playlist.items, { nullable: true })
  playlists?: Playlist[];

  @Column({ nullable: true, default: false })
  deleted?: boolean;
}
