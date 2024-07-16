import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { IItem } from "../item/item.interface.js";

@Entity('beets_album')
export class Album extends BaseEntity {

  @PrimaryColumn()
  id!: number;

  @Column({ nullable: true })
  artpath?: string;

  @Column({ type: 'real' })
  added?: number;

  @Column()
  albumartist?: string;

  @Column()
  albumartist_sort?: string;

  @Column()
  albumartist_credit?: string;

  @Column()
  name?: string;

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

  @Column({ type: 'real', nullable: true })
  rg_album_gain?: string;

  @Column({ type: 'real', nullable: true })
  rg_album_peak?: string;

  @Column({ type: 'real', nullable: true })
  r128_album_gain?: number;

  @Column()
  original_year?: number;

  @Column()
  original_month?: number;

  @Column()
  original_day?: number;

  @Column({ nullable: true })
  style?: string;

  @Column({ nullable: true })
  discogs_albumid?: number;

  @Column({ nullable: true })
  discogs_artistid?: number;

  @Column({ nullable: true })
  discogs_labelid?: number;

  @Column("simple-array", { nullable: true })
  albumtypes?: string[];

  @OneToMany('Item', (item: IItem) => item.album)
  items?: IItem[];

  @Column({ default: false })
  deleted?: boolean;
}
