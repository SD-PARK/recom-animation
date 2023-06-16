import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from 'src/db/entities/category.entity';
import { TypeOrmExModule } from 'src/typeorm_ex/typeorm_ex.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([Category]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
