import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TypeOrmExModule } from 'src/typeorm_ex/typeorm_ex.module';
import { TagRepository } from 'src/db/repository/tag.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([TagRepository]),
  ],
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule {}
