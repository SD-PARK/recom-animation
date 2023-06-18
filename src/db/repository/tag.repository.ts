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

    async findTag(tagName: string): Promise<Tag> {
        return await this.findOne({ where: { tag: tagName } });
    }

    async findTagById(tagId: number): Promise<Tag> {
        return await this.findOne({ where: { id: tagId } });
    }

    async findAllTag(): Promise<Tag[]> {
        return await this.find();
    }

    async updateTag(tagId: number, tagData: TagDto): Promise<void> {
        await this.update(tagId, tagData);
    }

    async deleteTag(tagId: number): Promise<void> {
        await this.delete(tagId);
    }
}