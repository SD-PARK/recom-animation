import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/typeorm_ex/typeorm_ex.module';
import { AnimationInfoController } from './animation-info.controller';
import { AnimationInfoService } from './animation-info.service';
import { AnimationInfoRepository } from 'src/db/repository/animation-info.repository';
import { CategoryRepository } from 'src/db/repository/category.repository';
import { TagRepository } from 'src/db/repository/tag.repository';
import { StreamingRepository } from 'src/db/repository/streaming.repository';
import { AnimationCategoryRepository } from 'src/db/repository/animation-category.repository';
import { AnimationTagRepository } from 'src/db/repository/animation-tag.repository copy 2';
import { AnimationStreamingRepository } from 'src/db/repository/animation-streaming.repository copy';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      AnimationInfoRepository,
      CategoryRepository,
      TagRepository,
      StreamingRepository,
      AnimationCategoryRepository,
      AnimationTagRepository,
      AnimationStreamingRepository
    ]),
  ],
  controllers: [AnimationInfoController],
  providers: [AnimationInfoService]
})
export class AnimationInfoModule {}