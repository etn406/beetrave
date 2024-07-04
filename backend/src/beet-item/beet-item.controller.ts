import { Controller, Get, Param } from '@nestjs/common';
import { BeetItemService } from './beet-item.service';

@Controller('item')
export class BeetItemController {
  constructor(private readonly beetItemService: BeetItemService) { }

  @Get('/list')
  findAll(page = 1, pageSize = 10) {
    return this.beetItemService.findAll(+page, +pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beetItemService.findOne(+id);
  }
}
