import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AnimationInfoService } from './animation-info.service';
import { CreateAnimationInfoDto } from './dto/create-animation-info.dto';
import { AnimationInfo } from 'src/db/entities/animation-info.entity';
import { UpdateAniamtionInfoDto } from './dto/update-animation-info.dto';

@Controller('animation-info')
export class AnimationInfoController {
    constructor(private readonly animationInfoService: AnimationInfoService) {}

    @Get()
    async findAll(): Promise<CreateAnimationInfoDto[]> {
        return await this.animationInfoService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<CreateAnimationInfoDto> {
        return await this.animationInfoService.findOne(id);
    }

    @Post()
    async createAnimationInfo(@Body() animationData: CreateAnimationInfoDto): Promise<{ message: string }> {
        await this.animationInfoService.createAnimationInfo(animationData);
        return { message: 'Success' };
    }

    @Patch(':id')
    async updateAnimationInfo(@Param('id') id: number, @Body() animationData: UpdateAniamtionInfoDto): Promise<{ message: string }> {
        await this.animationInfoService.updateAnimationInfo(id, animationData);
        return { message: 'Success' };
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<{message: string}> {
        await this.animationInfoService.delete(id);
        return { message: 'Success' };
    }
}