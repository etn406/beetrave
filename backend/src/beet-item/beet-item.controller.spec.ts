import { Test, TestingModule } from '@nestjs/testing';
import { BeetItemController } from './beet-item.controller';
import { BeetItemService } from './beet-item.service';

describe('BeetItemController', () => {
  let controller: BeetItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeetItemController],
      providers: [BeetItemService],
    }).compile();

    controller = module.get<BeetItemController>(BeetItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
