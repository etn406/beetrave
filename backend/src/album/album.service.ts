import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, Repository } from 'typeorm';
import { ItemService } from '../item/item.service.js';
import { mapFindOptionsOrderToDeprecatedOrderByCondition } from '../utils/querybuilder-order-by.polyfill.js';
import { Album } from './album.entity.js';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album) private albumRepository: Repository<Album>,
    private itemService: ItemService,
  ) { }

  async findAll(page: number, count: number, order: FindOptionsOrder<Album>): Promise<Album[]> {
    console.log({ page, count, order })

    // const albums = await this.albumRepository.find({
    //   select: {
    //     id: true,
    //     name: true,
    //     added: true,
    //     items: {
    //       title: true,
    //     },
    //   },
    //   relations: {
    //     items: true,
    //   },
    //   skip: page * count,
    //   take: count,
    //   order,
    // });

    const qb = await this.albumRepository.createQueryBuilder('album')
      .select([
        'album.id',
        // 'album.items',
      ])
      // .loadRelationCountAndMap('album.items_count', 'album.items')
      // .skip(page * count)
      // .leftJoinAndSelect("album.items", "item")
      .orderBy(mapFindOptionsOrderToDeprecatedOrderByCondition(order))
      .orderBy({ 'added': { order: 'ASC', 'nulls': 'NULLS FIRST' } })
      .skip(page * count)
      .take(count);

    const albums = await qb.getMany();

    console.log(qb.getQueryAndParameters())

    return albums;
  }

  findOne(id: number) {
    return this.albumRepository.findOne({ where: { id } })
  }
}
