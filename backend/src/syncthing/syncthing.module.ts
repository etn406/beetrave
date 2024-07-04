import { Module } from '@nestjs/common';
import { SyncthingController } from './syncthing.controller';
import { SyncthingService } from './syncthing.service';

@Module({
  providers: [SyncthingService],
  controllers: [SyncthingController]
})
export class SyncthingModule { }
