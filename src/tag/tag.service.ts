import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TagDto } from './dto/tag.dto';
import { Tag } from 'src/db/entities/tag.entity';
import { TagRepository } from 'src/db/repository/tag.repository';
import { AnimationTagRepository } from 'src/db/repository/animation-tag.repository';

@Injectable()
export class TagService {
    constructor(
        private readonly tagRepository: TagRepository,
        private readonly animationTagRepository: AnimationTagRepository,
    ) {}

    /**
     * 태그 레코드를 생성합니다.
     * @param tag - 생성할 태그
     * @throws BadRequestException - 중복된 태그가 있을 경우
     * @throws Error - 생성 과정 중 다른 오류가 발생한 경우
     */
    async create(tag: TagDto): Promise<void> {
        try {
            await this.tagRepository.createTag(tag);
        } catch(err) {
            if (err.code === 'ER_DUP_ENTRY') { throw new BadRequestException('중복된 값이 존재합니다: ' + tag.tag) }
            else { console.error('오류가 발생했습니다:', err.message); throw err; }
        }
    }

    /**
     * 태그명을 통해 태그 레코드를 검색합니다.
     * @param id - 검색할 태그 레코드의 태그명
     * @returns 검색된 태그 레코드
     * @throws NotFoundException - 일치하는 레코드가 없는 경우
     * @throws Error - 검색 과정 중 다른 오류가 발생한 경우
     */
    async findOne(tag: string): Promise<Tag> {
        try {
            const result: Tag = await this.tagRepository.findTag(tag);
            if (!result) { throw new NotFoundException(`일치하는 데이터를 찾을 수 없습니다: ${tag}`); }
            return result;
        } catch(err) {
            console.error('오류가 발생했습니다:', err.message);
            throw err;
        }
    }

    /**
     * 모든 태그 레코드를 검색합니다.
     * @returns 모든 태그 레코드의 배열
     */
    async findAll(): Promise<Tag[]> {
        return await this.tagRepository.findAllTag();
    }

    /**
     * 태그명을 변경합니다.
     * @param tagId - 변경할 태그의 ID
     * @param tagData - 변경할 태그 데이터
     */
    async update(tagId: number, tagData: TagDto): Promise<void> {
        try {
            const result = await this.tagRepository.findTagById(tagId);
            if (!result) { throw new NotFoundException(`일치하는 데이터를 찾을 수 없습니다: ${tagId}`); }
            await this.tagRepository.updateTag(tagId, tagData);
        } catch(err) {
            if (err.code === 'ER_DUP_ENTRY') { throw new BadRequestException('중복된 값이 존재합니다: ' + tagData.tag) }
            else { console.error('오류가 발생했습니다:', err.message); throw err; }
        }
    }

    /**
     * 태그명을 통해 태그 레코드를 삭제합니다.
     * @param tag - 삭제할 태그 레코드의 태그명
     * @throws NotFoundException - 일치하는 레코드가 없는 경우
     * @thrwos Error - 삭제 과정 중 다른 오류가 발생한 경우
     */
    async delete(tag: string): Promise<void> {
        const findTag: Tag = await this.findOne(tag);
        try {
            await this.animationTagRepository.deleteBytagId(findTag.id);
            await this.tagRepository.deleteTag(findTag.id);
        } catch(err) {
            console.error('오류가 발생했습니다:', err.message);
            throw err;
        }
    }
}
