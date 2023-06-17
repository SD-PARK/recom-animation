import { CustomRepository } from "src/typeorm_ex/typeorm-ex.decorator";
import { FindOneOptions, Repository } from "typeorm";
import { AnimationStreaming } from "../entities/animation-streaming.entity";

@CustomRepository(AnimationStreaming)
export class AnimationStreamingRepository extends Repository<AnimationStreaming> {
    async createRelation(animationId: number, streamingId: number): Promise<void> {
        const streaming = this.create({ animation_id: animationId, streaming_id: streamingId });
        await this.save(streaming);
    }

    async findWhere(where: FindOneOptions<AnimationStreaming>): Promise<AnimationStreaming> {
        return await this.findOne(where);
    }

    async findAll(): Promise<AnimationStreaming[]> {
        return await this.find();
    }

    async deleteByAnimationId(animationId: number): Promise<void> {
        await this.delete({ animation_id: animationId });
    }

    async deleteBystreamingId(streamingId: number): Promise<void> {
        await this.delete({ streaming_id: streamingId });
    }
}