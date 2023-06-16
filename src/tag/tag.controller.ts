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

    @Get(':tag')
    async findOne(@Param('tag') tag: string): Promise<Tag> {
        return await this.tagService.findOne(tag);
    }

    @Post()
    async create(@Body() tag: TagDto): Promise<{message: string}> {
        await this.tagService.create(tag);
        return { message: 'Success' };
    }

    @Delete(':tag')
    async delete(@Param('tag') tag: string): Promise<{message: string}> {
        await this.tagService.delete(tag);
        return { message: 'Success' };
    }
}
