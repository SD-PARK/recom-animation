import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { StreamingService } from './streaming.service';
import { Streaming } from 'src/db/entities/streaming.entity';
import { StreamingDto } from './dto/streaming.dto';

@Controller('streaming')
export class StreamingController {
    constructor(private readonly streamingService: StreamingService) {}

    @Get()
    async findAll(): Promise<Streaming[]> {
        return await this.streamingService.findAll();
    }

    @Get(':streaming')
    async findOne(@Param('streaming') streaming: string): Promise<Streaming> {
        return await this.streamingService.findOne(streaming);
    }

    @Post()
    async create(@Body() streaming: StreamingDto): Promise<{message: string}> {
        await this.streamingService.create(streaming);
        return { message: 'Success' };
    }

    @Delete(':streaming')
    async delete(@Param('streaming') streaming: string): Promise<{message: string}> {
        await this.streamingService.delete(streaming);
        return { message: 'Success' };
    }
}