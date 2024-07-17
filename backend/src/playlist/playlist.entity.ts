import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import type { Item } from "../item/item.entity.js";
import { PlaylistType } from "./playlist.interfaces.js";

@Entity()
export class Playlist extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column({
    name: "ptype",
    nullable: false,
    type: "enum",
    enum: PlaylistType,
    default: PlaylistType.Items
  })
  type?: PlaylistType;

  @ManyToMany('Item', (item: Item) => item.playlists)
  @JoinTable()
  items?: Item[];
}