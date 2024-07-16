import { Controller, Get, Param } from '@nestjs/common';
import { ItemService } from './item.service.js';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) { }

  @Get('/list')
  findAll(page = 1, pageSize = 10) {
    return this.itemService.findAll(+page, +pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
  }
}
