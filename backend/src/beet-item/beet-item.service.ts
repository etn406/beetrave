import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BeetItemFE } from 'src/frontend-interfaces/beet-item.interface';
import { BeetItem } from './entities/beet-item.entity';

@Injectable()
export class BeetItemService {
  constructor(
    @InjectModel(BeetItem)
    private beetItemRepository: typeof BeetItem,
  ) { }

  findAll(page: number, pageSize = 50) {
    return this.beetItemRepository.findAll({
      offset: page * pageSize,
      limit: pageSize,
      order: [['added', 'DESC']],
    });
  }

  findItemsOfAlbums(album_ids: number[]) {
    return this.beetItemRepository.findAll({
      where: { album_id: album_ids },
      order: [['disc', 'ASC'], ['track', 'ASC']]
    });
  }

  findOne(id: number) {
    return this.beetItemRepository.findOne({ where: { id } });
  }

  mapForFE(item: BeetItem): BeetItemFE {
    return {
      id: item.id,
      year: item.year,
      track: item.track,
      tracktotal: item.tracktotal,
      disc: item.disc,
      disctotal: item.disctotal,
      bpm: item.bpm,
      original_year: item.original_year,
      bitrate: item.bitrate,
      samplerate: item.samplerate,
      bitdepth: item.bitdepth,
      channels: item.channels,
      length: item.length,
      mtime: item.mtime,
      added: item.added,
      title: item.title,
      artist: item.artist,
      albumartist: item.albumartist,
      genre: item.genre,
      initial_key: item.initial_key,
      format: item.format,
      trackdisambig: item.trackdisambig,
    }
  }
}
