import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity.js';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>
  ) {}

  findAll(page: number, pageSize = 50) {
    return this.itemRepository.find({
      skip: page * pageSize,
      take: pageSize,
      order: { added: 'DESC' },
    });
  }

  findOne(id: number) {
    return this.itemRepository.findOne({ where: { id } });
  }
}
