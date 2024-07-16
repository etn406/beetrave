import { Module } from '@nestjs/common';
import { ItemModule } from '../item/item.module.js';
import { TypedConfigModule } from '../typed-config/typed-config.module.js';
import { SyncthingController } from './syncthing.controller.js';
import { SyncthingService } from './syncthing.service.js';

@Module({
  imports: [ItemModule, TypedConfigModule],
  providers: [SyncthingService],
  controllers: [SyncthingController],
})
export class SyncthingModule { }
