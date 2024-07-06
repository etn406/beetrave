import { Module } from '@nestjs/common';
import { TrackModule } from 'src/track/track.module';
import { SyncthingController } from './syncthing.controller';
import { SyncthingService } from './syncthing.service';

@Module({
  providers: [SyncthingService],
  controllers: [SyncthingController],
  imports: [TrackModule]
})
export class SyncthingModule { }
