import { Body, Controller, Post } from '@nestjs/common';
import { AnimationInfoService } from './animation-info.service';
import { AniamtionInfoDto } from './dto/animation-info.dto';

@Controller('animation-info')
export class AnimationInfoController {
    constructor(private readonly animationInfoService: AnimationInfoService) {}

    @Post()
    async createAnimationInfo(@Body() animationData: AniamtionInfoDto): Promise<{ message: string }> {
        await this.animationInfoService.createAnimationInfo(animationData);
        return { message: 'Success' };
    }
}