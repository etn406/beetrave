import { Test, TestingModule } from '@nestjs/testing';
import { BeetAlbumController } from './beet-album.controller';

describe('BeetAlbumController', () => {
  let controller: BeetAlbumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeetAlbumController],
    }).compile();

    controller = module.get<BeetAlbumController>(BeetAlbumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
