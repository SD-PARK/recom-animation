import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { StreamingService } from './streaming.service';
import { Streaming } from 'src/entities/streaming.entity';
import { StreamingDto } from './dto/streaming.dto';

@Controller('streaming')
export class StreamingController {
    constructor(private readonly streamingService: StreamingService) {}

    @Get()
    async findAll(): Promise<Streaming[]> {
        return await this.streamingService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Streaming> {
        return await this.streamingService.findOne(id);
    }

    @Post()
    async create(@Body() streaming: StreamingDto): Promise<{message: string}> {
        await this.streamingService.create(streaming);
        return { message: 'Success' };
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<{message: string}> {
        await this.streamingService.delete(id);
        return { message: 'Success' };
    }
}