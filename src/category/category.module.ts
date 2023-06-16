import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/typeorm_ex/typeorm_ex.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from 'src/db/entities/category.entity';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([Category]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
