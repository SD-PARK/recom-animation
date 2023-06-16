import { Module } from '@nestjs/common';
import { GenresController } from './genre.controller';
import { GenresService } from './genre.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from 'src/entities/genre.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Genre]),
  ],
  controllers: [GenresController],
  providers: [GenresService]
})
export class GenresModule {}
