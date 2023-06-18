import { CustomRepository } from "src/typeorm_ex/typeorm-ex.decorator";
import { FindOneOptions, Repository } from "typeorm";
import { AnimationTag } from "../entities/animation-tag.entity";

@CustomRepository(AnimationTag)
export class AnimationTagRepository extends Repository<AnimationTag> {
    async createRelation(animationId: number, tagId: number): Promise<void> {
        const tag = this.create({ animation_id: animationId, tag_id: tagId });
        await this.save(tag);
    }

    async findWhere(where: FindOneOptions<AnimationTag>): Promise<AnimationTag> {
        return await this.findOne(where);
    }

    async findAll(): Promise<AnimationTag[]> {
        return await this.find();
    }

    async deleteByAnimationId(animationId: number): Promise<void> {
        await this.delete({ animation_id: animationId });
    }

    async deleteBytagId(tagId: number): Promise<void> {
        await this.delete({ tag_id: tagId });
    }
}