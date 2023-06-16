import { Module } from '@nestjs/common';
import { StreamingController } from './streaming.controller';
import { StreamingService } from './streaming.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Streaming } from 'src/entities/streaming.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Streaming]),
  ],
  controllers: [StreamingController],
  providers: [StreamingService]
})
export class StreamingModule {}