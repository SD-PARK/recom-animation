import { Test, TestingModule } from '@nestjs/testing';
import { AnimationInfoService } from './animation-info.service';
import { AnimationInfoRepository } from 'src/db/repository/animation-info.repository';
import { AnimationStreamingRepository } from 'src/db/repository/animation-streaming.repository copy';
import { AnimationTagRepository } from 'src/db/repository/animation-tag.repository';
import { StreamingRepository } from 'src/db/repository/streaming.repository';
import { TagRepository } from 'src/db/repository/tag.repository';

describe('AnimationInfoService', () => {
  let service: AnimationInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimationInfoService,
                  AnimationInfoRepository,
                  TagRepository,
                  StreamingRepository,
                  AnimationTagRepository,
                  AnimationStreamingRepository],
    }).compile();

    service = module.get<AnimationInfoService>(AnimationInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
