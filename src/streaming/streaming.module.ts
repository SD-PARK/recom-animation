import { Module } from '@nestjs/common';
import { StreamingController } from './streaming.controller';
import { StreamingService } from './streaming.service';
import { StreamingRepository } from 'src/db/repository/streaming.repository';
import { TypeOrmExModule } from 'src/typeorm_ex/typeorm_ex.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([StreamingRepository]),
  ],
  controllers: [StreamingController],
  providers: [StreamingService]
})
export class StreamingModule {}