import { Module } from '@nestjs/common';
import { StreamingController } from './streaming.controller';
import { StreamingService } from './streaming.service';
import { StreamingRepository } from 'src/db/repository/streaming.repository';
import { TypeOrmExModule } from 'src/typeorm_ex/typeorm_ex.module';
import { AnimationStreamingRepository } from 'src/db/repository/animation-streaming.repository copy';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([StreamingRepository, AnimationStreamingRepository]),
  ],
  controllers: [StreamingController],
  providers: [StreamingService]
})
export class StreamingModule {}