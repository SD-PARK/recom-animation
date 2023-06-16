import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/typeorm_ex/typeorm_ex.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from 'src/db/entities/category.entity';
import { CategoryRepository } from 'src/db/repository/category.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([CategoryRepository]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
