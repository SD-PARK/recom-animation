import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AniamtionInfoDto } from './dto/animation-info.dto';
import { CategoryService } from 'src/category/category.service';
import { TagService } from 'src/tag/tag.service';
import { StreamingService } from 'src/streaming/streaming.service';
import { AnimationInfo } from 'src/db/entities/animation-info.entity';

@Injectable()
export class AnimationInfoService {
    constructor(
        @InjectRepository(AnimationInfo)
        private animationInfoRepository: Repository<AnimationInfo>,
        private categoryService: CategoryService,
        private tagService: TagService,
        private streamingService: StreamingService
    ) {}

    async createAnimationInfo(animationData: AniamtionInfoDto): Promise<void> {
        console.log(animationData);
        // try {
        //     await this.animationInfoRepository.insert(animationData);
        // } catch(err) {
        //     console.error('오류가 발생했습니다:', err.message);
        //     throw err;
        // }
    }
}
