import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AnimationInfoRepository } from 'src/db/repository/animation-info.repository';
import { CreateAnimationInfoDto } from './dto/create-animation-info.dto';
import { TagRepository } from 'src/db/repository/tag.repository';
import { StreamingRepository } from 'src/db/repository/streaming.repository';
import { AnimationTagRepository } from 'src/db/repository/animation-tag.repository';
import { AnimationStreamingRepository } from 'src/db/repository/animation-streaming.repository copy';
import { AnimationInfo } from 'src/db/entities/animation-info.entity';
import { UpdateAniamtionInfoDto } from './dto/update-animation-info.dto';

@Injectable()
export class AnimationInfoService {
    constructor(
        private readonly animationInfoRepository: AnimationInfoRepository,
        private readonly tagRepository: TagRepository,
        private readonly streamingRepository: StreamingRepository,
        private readonly animationTagRepository: AnimationTagRepository,
        private readonly animationStreamingRepository: AnimationStreamingRepository,
    ) {}

    async createAnimationInfo(animationData: CreateAnimationInfoDto): Promise<void> {
        let animationId: number;
        let categoryIDs: number[] = [], tagIDs: number[] = [], streamingIDs: number[] = [];
        const {
            tags,
            streamings,
            ...animationInfo
        } = animationData;

        // 카테고리, 태그, 스트리밍 사이트 유효성 검사 및 ID 검색
        ({ tagIDs, streamingIDs } = await this.tagNameValidation(tags, streamings));

        // 애니메이션 레코드 생성
        try {
            animationId = await this.animationInfoRepository.createAnimation(animationInfo);
        } catch(err) {
            console.error('오류가 발생했습니다:', err.message);
            throw err;
        }
        
        // 카테고리, 태그, 스트리밍 사이트 입력
        for(const tagId of tagIDs) { await this.animationTagRepository.createRelation(animationId, tagId); }
        for(const streamingId of streamingIDs) { await this.animationStreamingRepository.createRelation(animationId, streamingId); }
    }

    async findOne(animationId: number): Promise<CreateAnimationInfoDto> {
        try {
            const result: AnimationInfo = await this.animationInfoRepository.findAnimation(animationId);
            if (!result) { throw new NotFoundException(`일치하는 데이터를 찾을 수 없습니다: ${animationId}`); }
            return this.cleanInfoConversion(result);
        } catch(err) {
            console.error('오류가 발생했습니다:', err.message); throw err;
        }
    }

    async findAll(): Promise<CreateAnimationInfoDto[]> {
         const result: AnimationInfo[] = await this.animationInfoRepository.findAllAnimation();
         return result.map(ani => this.cleanInfoConversion(ani));
    }

    async updateAnimationInfo(animationId: number, updateData: UpdateAniamtionInfoDto): Promise<void> {
        await this.findOne(animationId);

        let tagIDs: number[] = [], streamingIDs: number[] = [];
        const {
            tags,
            streamings,
            ...updateAnimationInfo
        } = updateData;

        // 태그, 스트리밍 사이트 유효성 검사 및 ID 검색
        ({ tagIDs, streamingIDs } = await this.tagNameValidation(tags, streamings));

        // 애니메이션 레코드 업데이트
        if (Object.keys(updateAnimationInfo).length > 0) {
            try {
                await this.animationInfoRepository.updateAnimation(animationId, updateData);
            } catch(err) {
                console.error('오류가 발생했습니다:', err.message);
                throw err;
            }
        }
        
        // 태그, 스트리밍 사이트 입력
        if (tags) {
            await this.animationTagRepository.deleteByAnimationId(animationId);
            for(const tagId of tagIDs) {
                await this.animationTagRepository.createRelation(animationId, tagId);
            }
        }
        if (streamings) {
            await this.animationStreamingRepository.deleteByAnimationId(animationId);
            for(const streamingId of streamingIDs) {
                await this.animationStreamingRepository.createRelation(animationId, streamingId);
            }
        }
    }

    async delete(animationId: number): Promise<void> {
        await this.findOne(animationId);
        try {
            await this.animationTagRepository.deleteByAnimationId(animationId);
            await this.animationStreamingRepository.deleteByAnimationId(animationId);

            await this.animationInfoRepository.deleteAnimation(animationId);
        } catch(err) {
            console.error('오류가 발생했습니다:', err.message);
            throw err;
        }
    }

    /**
     * 태그, 스트리밍 배열에 대해 유효성 검사를 진행 후, 각 배열과 매핑된 ID 배열을 반환합니다.
     * @param categories - 유효성 검사를 진행할 카테고리 배열
     * @param tags - 유효성 검사를 진행할 태그 배열
     * @param streamings - 유효성 검사를 진행할 스트리밍 배열
     * @returns 태그, 스트리밍의 ID 배열입니다.
     * @throws 등록되지 않은 태그, 스트리밍 사이트가 있을 경우 'BadRequestException'이 발생합니다.
     */
    private async tagNameValidation(tags: string[], streamings: string[]): Promise<{ tagIDs: number[], streamingIDs: number[] }> {
        let categoryIDs: number[] = [], tagIDs: number[] = [], streamingIDs: number[] = [];
        try {
            if (tags) {
                const allTag = await this.tagRepository.findAllTag();
                tagIDs = getMatchingIds(tags, allTag);
                if (tags.length !== tagIDs.length) {
                    throw new BadRequestException('등록되지 않은 태그입니다.');
                }
            }
            if (streamings) {
                const allStreaming = await this.streamingRepository.findAllStreaming();
                streamingIDs = getMatchingIds(streamings, allStreaming);
                if (streamings.length !== streamingIDs.length) {
                    throw new BadRequestException('등록되지 않은 스트리밍 사이트입니다.');
                }
            }
        } catch(err) {
            console.error('오류가 발생했습니다:', err.message);
            throw err;
        }

        return { tagIDs, streamingIDs };
    }

    private cleanInfoConversion(originalData: AnimationInfo): CreateAnimationInfoDto {
        const modifiedObject = JSON.parse(JSON.stringify(originalData));
        modifiedObject.tags = originalData.tags.map(tag => tag.tag.tag);
        modifiedObject.streamings = originalData.streamings.map(streaming => streaming.streaming.streaming);
        return modifiedObject;
    }
}

/**
 * 객체 배열과 배열을 입력받아 배열의 인자와 일치하는 객체 배열의 ID 값의 배열을 반환합니다.
 * @param array - 비교할 배열
 * @param allArray - ID가 포함된 객체 배열
 * @returns ID 배열
 */
function getMatchingIds(array: string[], allArray: ObjectService[]): number[] {
    const matchingIds: number[] = [];
  
    for (const service of allArray) {
      const { id, streaming, tag } = service;
      const lowerCasedStreaming = (streaming || tag || "").toLowerCase();

      if (array.includes(lowerCasedStreaming)) {
        matchingIds.push(id);
      }
    }
    return matchingIds;
}

type ObjectService = {
    id: number;
    streaming?: string;
    tag?: string;
};