import { Test, TestingModule } from '@nestjs/testing';
import { AnimationInfoController } from './animation-info.controller';

describe('AnimationInfoController', () => {
  let controller: AnimationInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimationInfoController],
    }).compile();

    controller = module.get<AnimationInfoController>(AnimationInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
