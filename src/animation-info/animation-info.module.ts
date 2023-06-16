import { Module } from '@nestjs/common';
import { AnimationInfoController } from './animation-info.controller';
import { AnimationInfoService } from './animation-info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimationInfo } from '../db/entities/animation-info.entity';
import { CategoryModule } from 'src/category/category.module';
import { TagModule } from 'src/tag/tag.module';
import { StreamingModule } from 'src/streaming/streaming.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnimationInfo]),
  ],
  controllers: [AnimationInfoController],
  providers: [AnimationInfoService]
})
export class AnimationInfoModule {}