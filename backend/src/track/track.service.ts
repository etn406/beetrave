import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackFE } from 'src/frontend-interfaces/track.interface';
import { In, Repository } from 'typeorm';
import { Track } from './track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track) private readonly trackRepository: Repository<Track>,
  ) { }

  findAll(page: number, pageSize = 50) {
    return this.trackRepository.find({
      skip: page * pageSize,
      take: pageSize,
      order: { added: 'DESC' },
    });
  }

  findItemsOfAlbums(album_ids: number[]) {
    return this.trackRepository.find({
      where: { album_id: In(album_ids) },
      order: {
        disc: 'ASC',
        track: 'ASC',
      }
    });
  }

  findOne(id: number) {
    return this.trackRepository.findOne({ where: { id } });
  }

  mapForFE(item: Track): TrackFE {
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

  async getPathsOfIds(ids: number[]): Promise<Pick<Track, "path" | "id">[]> {
    return this.trackRepository.find({
      select: ['id', 'path'],
      where: { id: In(ids) },
      order: { path: 'asc' }
    }) as Promise<Pick<Track, "path" | "id">[]>;
  }

}
