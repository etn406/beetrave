import { Test, TestingModule } from '@nestjs/testing';
import { SyncthingController } from './syncthing.controller';

describe('SyncthingController', () => {
  let controller: SyncthingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SyncthingController],
    }).compile();

    controller = module.get<SyncthingController>(SyncthingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
