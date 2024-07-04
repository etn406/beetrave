import { Test, TestingModule } from '@nestjs/testing';
import { SyncthingService } from './syncthing.service';

describe('SyncthingService', () => {
  let service: SyncthingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SyncthingService],
    }).compile();

    service = module.get<SyncthingService>(SyncthingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
