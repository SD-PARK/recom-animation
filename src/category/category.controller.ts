import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { Category } from 'src/entities/category.entity';
import { CategoryDto } from '../category/dto/category.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async findAll(): Promise<Category[]> {
        return await this.categoryService.findAll();
    }

    @Get(':category')
    async findOne(@Param('category') category: string): Promise<Category> {
        return await this.categoryService.findOne(category);
    }

    @Post()
    async create(@Body() category: CategoryDto): Promise<{message: string}> {
        await this.categoryService.create(category);
        return { message: 'Success' };
    }

    @Delete(':category')
    async delete(@Param('category') category: string): Promise<{message: string}> {
        await this.categoryService.delete(category);
        return { message: 'Success' };
    }
}
