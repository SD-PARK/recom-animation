import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { Streaming } from 'src/db/entities/streaming.entity';
import { StreamingDto } from './dto/streaming.dto';
import { StreamingRepository } from 'src/db/repository/streaming.repository';

@Injectable()
export class StreamingService {
    constructor(private readonly streamingRepository: StreamingRepository) {}

    /**
     * 스트리밍 레코드를 생성합니다.
     * @param streaming - 생성할 스트리밍 사이트
     * @throws BadRequestException - 중복된 스트리밍 사이트가 있을 경우
     * @throws Error - 생성 과정 중 다른 오류가 발생한 경우
     */
    async create(streaming: StreamingDto): Promise<void> {
        try {
            await this.streamingRepository.createStreaming(streaming);
        } catch(err) {
            if (err.code === 'ER_DUP_ENTRY') { throw new BadRequestException('중복된 값이 존재합니다: ' + streaming.streaming) }
            else { console.error('오류가 발생했습니다:', err.message); throw err; }
        }
    }
    
    /**
     * 스트리밍 사이트 명을 통해 스트리밍 레코드를 검색합니다.
     * @param streaming - 검색할 스트리밍 레코드의 사이트 명
     * @returns 검색된 스트리밍 레코드
     * @throws NotFoundException - 일치하는 레코드가 없는 경우
     * @throws Error - 검색 과정 중 다른 오류가 발생한 경우
     */
    async findOne(streaming: string): Promise<Streaming> {
        try {
            return await this.streamingRepository.findStreaming({ where: { streaming: streaming } });
        } catch(err) {
            if (err instanceof EntityNotFoundError) { throw new NotFoundException(`일치하는 데이터를 찾을 수 없습니다: ${streaming}`); }
            else { console.error('오류가 발생했습니다:', err.message); throw err; }
        }
    }

    /**
     * 모든 스트리밍 레코드를 검색합니다.
     * @returns 모든 스트리밍 레코드의 배열
     */
    async findAll(): Promise<Streaming[]> {
        return await this.streamingRepository.findAllStreaming();
    }

    /**
     * 스트리밍 사이트명을 통해 스트리밍 레코드를 삭제합니다.
     * @param streaming - 삭제할 스트리밍 레코드의 사이트 명
     * @throws NotFoundException - 일치하는 레코드가 없는 경우
     * @thrwos Error - 삭제 과정 중 다른 오류가 발생한 경우
     */
    async delete(streaming: string): Promise<void> {
        const findStreaming = await this.findOne(streaming);
        try {
            await this.streamingRepository.deleteStreaming(findStreaming.id);
        } catch(err) {
            console.error('오류가 발생했습니다:', err.message);
            throw err;
        }
    }
}
