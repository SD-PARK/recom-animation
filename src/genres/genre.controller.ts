import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { Genre } from 'src/entities/genre.entity';
import { GenreDto } from './dto/genre.dto';
import { GenreService } from './genre.service';

@Controller('genre')
export class GenreController {
    constructor(private readonly genreService: GenreService) {}

    @Get()
    async findAll(): Promise<Genre[]> {
        return await this.genreService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Genre> {
        return await this.genreService.findOne(id);
    }

    @Post()
    async create(@Body() genre: GenreDto): Promise<{message: string}> {
        await this.genreService.create(genre);
        return { message: 'Success' };
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<{message: string}> {
        await this.genreService.delete(id);
        return { message: 'Success' };
    }
}
