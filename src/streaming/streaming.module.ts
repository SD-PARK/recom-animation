import { Module } from '@nestjs/common';
import { StreamingController } from './streaming.controller';
import { StreamingService } from './streaming.service';
import { Streaming } from 'src/streaming/streaming.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Streaming]),
  ],
  controllers: [StreamingController],
  providers: [StreamingService]
})
export class StreamingModule {}
