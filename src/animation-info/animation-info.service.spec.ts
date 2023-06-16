import { Test, TestingModule } from '@nestjs/testing';
import { AnimationInfoService } from './animation-info.service';

describe('AnimationInfoService', () => {
  let service: AnimationInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimationInfoService],
    }).compile();

    service = module.get<AnimationInfoService>(AnimationInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
