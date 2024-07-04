import { Controller, Get } from '@nestjs/common';
import { SyncthingService } from './syncthing.service';

@Controller('syncthing')
export class SyncthingController {
  constructor(
    private syncthingService: SyncthingService
  ) { }

  @Get('list')
  list() {
    return this.syncthingService.readSyncthingFile()
  }
}
