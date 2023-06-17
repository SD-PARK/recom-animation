import { CustomRepository } from "src/typeorm_ex/typeorm-ex.decorator";
import { AnimationInfo } from "../entities/animation-info.entity";
import { Repository } from "typeorm";
import { CreateAnimationInfoDto } from "src/animation-info/dto/create-animation-info.dto";
import { UpdateAniamtionInfoDto } from "src/animation-info/dto/update-animation-info.dto";

@CustomRepository(AnimationInfo)
export class AnimationInfoRepository extends Repository<AnimationInfo> {

    /**
     * 애니메이션 레코드 생성 후 ID 반환
     * @param animationData - 생성할 애니메이션 데이터
     * @returns Promise<number> - 생성한 레코드의 애니메이션 ID
     */
    async createAnimation(animationData: CreateAnimationInfoDto): Promise<number> {
        const {
            categories,
            tags,
            streamings,
            ...animationInfo
        } = animationData
        const animation = this.create(animationInfo);
        const animationId = (await this.save(animation)).id;
        return animationId;
    }

    async findAnimation(animationId: number): Promise<AnimationInfo> {
        return await this.findOne({ where: { id: animationId }, relations: ["categories.category", "tags.tag", "streamings.streaming"]});
    }

    async findAllAnimation(): Promise<AnimationInfo[]> {
        return await this.find({ relations: ["categories.category", "tags.tag", "streamings.streaming"] });
    }

    async updateAnimation(animationId: number, animationData: UpdateAniamtionInfoDto): Promise<void> {
        const {
            categories,
            tags,
            streamings,
            ...animationInfo
        } = animationData
        await this.update(animationId, animationInfo);
    }

    async deleteAnimation(animationId: number): Promise<void> {
        await this.delete(animationId);
    }
}