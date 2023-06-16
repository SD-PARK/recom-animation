import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TagDto } from './dto/tag.dto';
import { Tag } from 'src/entities/tag.entity';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Get()
    async findAll(): Promise<Tag[]> {
        return await this.tagService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Tag> {
        return await this.tagService.findOne(id);
    }

    @Post()
    async create(@Body() tag: TagDto): Promise<{message: string}> {
        await this.tagService.create(tag);
        return { message: 'Success' };
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<{message: string}> {
        await this.tagService.delete(id);
        return { message: 'Success' };
    }
}
