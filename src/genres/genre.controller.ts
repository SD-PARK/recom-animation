import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { Genre } from 'src/genres/genre.entity';
import { GenreDto } from './dto/genre.dto';
import { GenreService } from './genre.service';

@Controller('genre')
export class GenreController {
    constructor(private readonly genreService: GenreService) {}

    @Get()
    async findAll(): Promise<Genre[]> {
        return await this.genreService.findAll();
    }

    @Get(':genre')
    async findOne(@Param('genre') genre: string): Promise<Genre> {
        return await this.genreService.findOne(genre);
    }

    @Post()
    async create(@Body() genre: GenreDto): Promise<{message: string}> {
        await this.genreService.create(genre);
        return { message: 'Success' };
    }

    @Delete(':genre')
    async delete(@Param('genre') genre: string): Promise<{message: string}> {
        await this.genreService.delete(genre);
        return { message: 'Success' };
    }
}
