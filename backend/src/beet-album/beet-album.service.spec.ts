import { Test, TestingModule } from '@nestjs/testing';
import { BeetAlbumService } from './beet-album.service';

describe('BeetAlbumService', () => {
  let service: BeetAlbumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeetAlbumService],
    }).compile();

    service = module.get<BeetAlbumService>(BeetAlbumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
