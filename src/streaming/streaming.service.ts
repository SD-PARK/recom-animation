import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Streaming } from 'src/db/entities/streaming.entity';
import { StreamingDto } from './dto/streaming.dto';
import { StreamingRepository } from 'src/db/repository/streaming.repository';
import { AnimationStreamingRepository } from 'src/db/repository/animation-streaming.repository copy';

@Injectable()
export class StreamingService {
    constructor(
        private readonly streamingRepository: StreamingRepository,
        private readonly animationStreamingRepository: AnimationStreamingRepository,
    ) {}

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
            const result: Streaming = await this.streamingRepository.findStreaming(streaming);
            if (!result) { throw new NotFoundException(`일치하는 데이터를 찾을 수 없습니다: ${streaming}`); }
            return result;
        } catch(err) {
            console.error('오류가 발생했습니다:', err.message); throw err;
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
     * 스트리밍 사이트명을 변경합니다.
     * @param streamingId - 변경할 스트리밍 사이트의 ID
     * @param streamingData - 변경할 스트리밍 사이트 데이터
     */
    async update(streamingId: number, streamingData: StreamingDto): Promise<void> {
        try {
            const result = await this.streamingRepository.findStreamingById(streamingId);
            if (!result) { throw new NotFoundException(`일치하는 데이터를 찾을 수 없습니다: ${streamingId}`); }
            await this.streamingRepository.updateStreaming(streamingId, streamingData);
        } catch(err) {
            console.error('오류가 발생했습니다:', err.message);
            throw err;
        }
    }

    /**
     * 스트리밍 사이트명을 통해 스트리밍 레코드를 삭제합니다.
     * @param streaming - 삭제할 스트리밍 레코드의 사이트 명
     * @throws NotFoundException - 일치하는 레코드가 없는 경우
     * @thrwos Error - 삭제 과정 중 다른 오류가 발생한 경우
     */
    async delete(streaming: string): Promise<void> {
        const findStreaming: Streaming = await this.findOne(streaming);
        try {
            await this.animationStreamingRepository.deleteBystreamingId(findStreaming.id);
            await this.streamingRepository.deleteStreaming(findStreaming.id);
        } catch(err) {
            console.error('오류가 발생했습니다:', err.message);
            throw err;
        }
    }
}
