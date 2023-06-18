import { Test, TestingModule } from '@nestjs/testing';
import { StreamingService } from './streaming.service';
import { StreamingRepository } from 'src/db/repository/streaming.repository';
import { AnimationStreamingRepository } from 'src/db/repository/animation-streaming.repository copy';

describe('StreamingService', () => {
  let service: StreamingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StreamingService, StreamingRepository, AnimationStreamingRepository],
    }).compile();

    service = module.get<StreamingService>(StreamingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
