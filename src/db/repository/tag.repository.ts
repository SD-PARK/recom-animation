import { CustomRepository } from "src/typeorm_ex/typeorm-ex.decorator";
import { Tag } from "../entities/tag.entity";
import { FindOneOptions, Repository } from "typeorm";
import { TagDto } from "src/tag/dto/tag.dto";

@CustomRepository(Tag)
export class TagRepository extends Repository<Tag> {
    async createTag(tagData: TagDto): Promise<void> {
        const tag = this.create(tagData);
        await this.save(tag);
    }

    async findTag(tagData: FindOneOptions<Tag>): Promise<Tag> {
        return await this.findOne(tagData);
    }

    async findAllTag(): Promise<Tag[]> {
        return await this.find();
    }

    async deleteTag(tagId: number): Promise<void> {
        await this.delete(tagId);
    }
}