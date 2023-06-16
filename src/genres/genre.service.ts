import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { GenreDto } from './dto/genre.dto';
import { Genre } from 'src/entities/genre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class GenreService {
    constructor(
        @InjectRepository(Genre)
        private genreRepository: Repository<Genre>
    ) {}

    /**
     * 장르 레코드를 생성합니다.
     * @param genre - 생성할 장르
     * @throws BadRequestException - 중복된 장르가 있을 경우
     * @throws Error - 생성 과정 중 다른 오류가 발생한 경우
     */
    async create(genre: GenreDto): Promise<void> {
        try {
            await this.genreRepository.insert(genre);
        } catch(err) {
            if (err.code === 'ER_DUP_ENTRY') { throw new BadRequestException('중복된 값이 존재합니다: ' + genre.genre) }
            else { console.error('오류가 발생했습니다:', err.message); throw err; }
        }
    }
    
    /**
     * ID를 통해 장르 레코드를 검색합니다.
     * @param id - 검색할 장르 레코드의 ID
     * @returns 검색된 장르 레코드
     * @throws NotFoundException - 일치하는 레코드가 없는 경우
     * @throws Error - 검색 과정 중 다른 오류가 발생한 경우
     */
    async findOne(id: number): Promise<Genre> {
        try {
            return await this.genreRepository.findOneOrFail({ where: { id: id } });
        } catch(err) {
            if (err instanceof EntityNotFoundError) { throw new NotFoundException(`일치하는 데이터를 찾을 수 없습니다: ${id}`); }
            else { console.error('오류가 발생했습니다:', err.message); throw err; }
        }
    }

    /**
     * 모든 장르 레코드를 검색합니다.
     * @returns 모든 장르 레코드의 배열
     */
    async findAll(): Promise<Genre[]> {
        return await this.genreRepository.find();
    }

    /**
     * ID를 통해 장르 레코드를 삭제합니다.
     * @param id - 삭제할 장르 레코드의 ID
     * @throws NotFoundException - 일치하는 레코드가 없는 경우
     * @thrwos Error - 삭제 과정 중 다른 오류가 발생한 경우
     */
    async delete(id: number): Promise<void> {
        const findGenre = await this.findOne(id);
        try {
            await this.genreRepository.remove(findGenre);
        } catch(err) {
            console.error('오류가 발생했습니다:', err.message);
            throw err;
        }
    }
}
