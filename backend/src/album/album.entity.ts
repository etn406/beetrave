import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('albums')
export class Album {

  @PrimaryColumn()
  id?: number;

  @Column({ type: 'blob' })
  artpath?: Buffer;

  @Column()
  added?: string;

  @Column()
  albumartist?: string;

  @Column()
  albumartist_sort?: string;

  @Column()
  albumartist_credit?: string;

  @Column()
  album?: string;

  @Column()
  genre?: string;

  @Column()
  year?: number;

  @Column()
  month?: number;

  @Column()
  day?: number;

  @Column()
  disctotal?: number;

  @Column()
  comp?: number;

  @Column()
  mb_albumid?: string;

  @Column()
  mb_albumartistid?: string;

  @Column()
  albumtype?: string;

  @Column()
  label?: string;

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
  albumdisambig?: string;

  @Column()
  releasegroupdisambig?: string;

  @Column()
  rg_album_gain?: string;

  @Column()
  rg_album_peak?: string;

  @Column()
  r128_album_gain?: number;

  @Column()
  original_year?: number;

  @Column()
  original_month?: number;

  @Column()
  original_day?: number;

  @Column()
  style?: string;

  @Column()
  discogs_albumid?: number;

  @Column()
  discogs_artistid?: number;

  @Column()
  discogs_labelid?: number;

  @Column()
  albumtypes?: string;
}
