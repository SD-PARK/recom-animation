import { Test, TestingModule } from '@nestjs/testing';
import { TagService } from './tag.service';
import { TagRepository } from 'src/db/repository/tag.repository';
import { AnimationTagRepository } from 'src/db/repository/animation-tag.repository';

describe('TagService', () => {
  let service: TagService;
  let tagRepository: TagRepository;
  let animationTagRepository: AnimationTagRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagService, TagRepository, AnimationTagRepository],
    }).compile();

    service = module.get<TagService>(TagService);
    tagRepository = module.get<TagRepository>(TagRepository);
    animationTagRepository = module.get<AnimationTagRepository>(AnimationTagRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    // it('태그가 생성되는가?', async () => {
    //   const beforeTagLength: number = (await tagRepository.findAllTag()).length;
    //   await service.create({
    //     tag: 'TestTag'
    //   });
    //   const afterTagLength: number = (await tagRepository.findAllTag()).length;
    //   expect(afterTagLength).toBeGreaterThan(beforeTagLength);
    // });
  });

  describe('findOne', () => {

  });

  describe('findAll', () => {

  });

  describe('update', () => {

  });

  describe('delete', () => {

  });
});
