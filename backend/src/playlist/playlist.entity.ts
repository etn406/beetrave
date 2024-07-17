import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { IItem } from "../item/item.interface.js";
import { IPlaylist, PlaylistType } from "./playlist.interfaces.js";

@Entity()
export class Playlist extends BaseEntity implements IPlaylist {
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

  @ManyToMany('Item', (item: IItem) => item.playlists)
  items?: IItem[];
}