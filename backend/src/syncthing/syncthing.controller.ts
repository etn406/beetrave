import { Controller, Get } from '@nestjs/common';
import { SyncthingService } from './syncthing.service.js';

@Controller('syncthing')
export class SyncthingController {
  constructor(
    private syncthingService: SyncthingService
  ) { }

  @Get('list')
  list() {
  }
}
