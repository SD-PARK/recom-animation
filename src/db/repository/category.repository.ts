import { CustomRepository } from "src/typeorm_ex/typeorm-ex.decorator";
import { Category } from "../entities/category.entity";
import { FindOneOptions, Repository } from "typeorm";
import { CategoryDto } from "src/category/dto/category.dto";

@CustomRepository(Category)
export class CategoryRepository extends Repository<Category> {
    async createCategory(categoryData: CategoryDto): Promise<void> {
        const category = this.create(categoryData);
        await this.save(category);
    }

    async findCategory(categoryData: FindOneOptions<Category>): Promise<Category> {
        return await this.findOne(categoryData);
    }

    async findAllCategory(): Promise<Category[]> {
        return await this.find();
    }

    async deleteCategory(categoryId: number): Promise<void> {
        await this.delete(categoryId);
    }
}