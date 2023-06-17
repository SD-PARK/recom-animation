import { CustomRepository } from "src/typeorm_ex/typeorm-ex.decorator";
import { FindOneOptions, Repository } from "typeorm";
import { AnimationCategory } from "../entities/animation-category.entity";

@CustomRepository(AnimationCategory)
export class AnimationCategoryRepository extends Repository<AnimationCategory> {
    async createRelation(animationId: number, categoryId: number): Promise<void> {
        const category = this.create({ animation_id: animationId, category_id: categoryId });
        await this.save(category);
    }

    async findWhere(where: FindOneOptions<AnimationCategory>): Promise<AnimationCategory> {
        return await this.findOne(where);
    }

    async findAll(): Promise<AnimationCategory[]> {
        return await this.find();
    }

    async deleteByAnimationId(animationId: number): Promise<void> {
        await this.delete({ animation_id: animationId });
    }

    async deleteByCategoryId(categoryId: number): Promise<void> {
        await this.delete({ category_id: categoryId });
    }
}