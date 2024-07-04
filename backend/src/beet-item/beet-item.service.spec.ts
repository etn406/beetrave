import { Test, TestingModule } from '@nestjs/testing';
import { BeetItemService } from './beet-item.service';

describe('BeetItemService', () => {
  let service: BeetItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeetItemService],
    }).compile();

    service = module.get<BeetItemService>(BeetItemService);
  }); 

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
