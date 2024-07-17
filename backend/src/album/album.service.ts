import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemService } from '../item/item.service.js';
import { Album } from './album.entity.js';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album) private albumRepository: Repository<Album>,
    private itemService: ItemService,
  ) { }

  async findAll(page: number, pageSize: number): Promise<Album[]> {
    const albums = (await this.albumRepository.find({
      relations: ['items'],
      skip: page * pageSize,
      take: pageSize,
      order: {
        added: 'DESC',
      },
    }));

    return albums;
  }

  findOne(id: number) {
    return this.albumRepository.findOne({ where: { id } })
  }
}
