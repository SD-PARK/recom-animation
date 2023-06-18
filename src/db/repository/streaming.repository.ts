import { CustomRepository } from "src/typeorm_ex/typeorm-ex.decorator";
import { Streaming } from "../entities/streaming.entity";
import { FindOneOptions, Repository } from "typeorm";
import { StreamingDto } from "src/streaming/dto/streaming.dto";

@CustomRepository(Streaming)
export class StreamingRepository extends Repository<Streaming> {
    async createStreaming(streamingData: StreamingDto): Promise<void> {
        const streaming = this.create(streamingData);
        await this.save(streaming);
    }

    async findStreaming(streamingName: string): Promise<Streaming> {
        return await this.findOne({ where: { streaming: streamingName } });
    }

    async findStreamingById(streamingId: number): Promise<Streaming> {
        return await this.findOne({ where: { id: streamingId } });
    }

    async findAllStreaming(): Promise<Streaming[]> {
        return await this.find();
    }

    async updateStreaming(streamingId: number, streamingData: StreamingDto): Promise<void> {
        await this.update(streamingId, streamingData);
    }

    async deleteStreaming(streamingId: number): Promise<void> {
        await this.delete(streamingId);
    }
}