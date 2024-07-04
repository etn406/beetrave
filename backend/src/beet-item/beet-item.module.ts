import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BeetItemController } from './beet-item.controller';
import { BeetItemService } from './beet-item.service';
import { BeetItem } from './entities/beet-item.entity';

@Module({
  imports: [SequelizeModule.forFeature([BeetItem])],
  controllers: [BeetItemController],
  providers: [BeetItemService],
  exports: [BeetItemService]
})
export class BeetItemModule { }
