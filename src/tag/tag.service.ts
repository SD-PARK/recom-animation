import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/entities/tag.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { TagDto } from './dto/tag.dto';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private tagRepository: Repository<Tag>
    ) {}

    /**
     * 태그 레코드를 생성합니다.
     * @param streaming - 생성할 태그
     * @throws BadRequestException - 중복된 태그가 있을 경우
     * @throws Error - 생성 과정 중 다른 오류가 발생한 경우
     */
    async create(tag: TagDto): Promise<void> {
        try {
            await this.tagRepository.insert(tag);
        } catch(err) {
            if (err.code === 'ER_DUP_ENTRY') { throw new BadRequestException('중복된 값이 존재합니다: ' + tag.tag) }
            else { console.error('오류가 발생했습니다:', err.message); throw err; }
        }
    }

    /**
     * ID를 통해 태그 레코드를 검색합니다.
     * @param id - 검색할 태그 레코드의 ID
     * @returns 검색된 태그 레코드
     * @throws NotFoundException - 일치하는 레코드가 없는 경우
     * @throws Error - 검색 과정 중 다른 오류가 발생한 경우
     */
    async findOne(id: number): Promise<Tag> {
        try {
            return await this.tagRepository.findOneOrFail({ where: { id: id }});
        } catch(err) {
            if (err instanceof EntityNotFoundError) { throw new NotFoundException(`일치하는 데이터를 찾을 수 없습니다: ${id}`); }
            else { console.error('오류가 발생했습니다:', err.message); throw err; }
        }
    }

    /**
     * 모든 태그 레코드를 검색합니다.
     * @returns 모든 태그 레코드의 배열
     */
    async findAll(): Promise<Tag[]> {
        return await this.tagRepository.find();
    }

    /**
     * ID를 통해 태그 레코드를 삭제합니다.
     * @param id - 삭제할 태그 레코드의 ID
     * @throws NotFoundException - 일치하는 레코드가 없는 경우
     * @thrwos Error - 삭제 과정 중 다른 오류가 발생한 경우
     */
    async delete(id: number): Promise<void> {
        const findTag = await this.findOne(id);
        try {
            await this.tagRepository.delete(findTag);
        } catch(err) {
            console.error('오류가 발생했습니다:', err.message);
            throw err;
        }
    }
}
