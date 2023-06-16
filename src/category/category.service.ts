import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) {}

    /**
     * 카테고리 레코드를 생성합니다.
     * @param category - 생성할 카테고리
     * @throws BadRequestException - 중복된 카테고리가 있을 경우
     * @throws Error - 생성 과정 중 다른 오류가 발생한 경우
     */
    async create(category: CategoryDto): Promise<void> {
        try {
            await this.categoryRepository.insert(category);
        } catch(err) {
            if (err.code === 'ER_DUP_ENTRY') { throw new BadRequestException('중복된 값이 존재합니다: ' + category.category) }
            else { console.error('오류가 발생했습니다:', err.message); throw err; }
        }
    }
    
    /**
     * 카테고리명을 통해 카테고리 레코드를 검색합니다.
     * @param category - 검색할 카테고리 레코드의 카테고리명
     * @returns 검색된 카테고리 레코드
     * @throws NotFoundException - 일치하는 레코드가 없는 경우
     * @throws Error - 검색 과정 중 다른 오류가 발생한 경우
     */
    async findOne(category: string): Promise<Category> {
        try {
            return await this.categoryRepository.findOneOrFail({ where: { category: category } });
        } catch(err) {
            if (err instanceof EntityNotFoundError) { throw new NotFoundException(`일치하는 데이터를 찾을 수 없습니다: ${category}`); }
            else { console.error('오류가 발생했습니다:', err.message); throw err; }
        }
    }

    /**
     * 모든 카테고리 레코드를 검색합니다.
     * @returns 모든 카테고리 레코드의 배열
     */
    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    /**
     * 카테고리명을 통해 카테고리 레코드를 삭제합니다.
     * @param category - 삭제할 카테고리 레코드의 카테고리명
     * @throws NotFoundException - 일치하는 레코드가 없는 경우
     * @thrwos Error - 삭제 과정 중 다른 오류가 발생한 경우
     */
    async delete(category: string): Promise<void> {
        const findCategory = await this.findOne(category);
        try {
            await this.categoryRepository.remove(findCategory);
        } catch(err) {
            console.error('오류가 발생했습니다:', err.message);
            throw err;
        }
    }
}