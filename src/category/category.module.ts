import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/typeorm_ex/typeorm_ex.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from 'src/db/repository/category.repository';
import { AnimationCategoryRepository } from 'src/db/repository/animation-category.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([CategoryRepository, AnimationCategoryRepository]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
