import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MysqlModule } from './mysql/mysql.module';
import { StreamingModule } from './streaming/streaming.module';
import { TagModule } from './tag/tag.module';
import { GenreModule } from './genres/genre.module';
import { AnimationInfoModule } from './animation-info/animation-info.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MysqlModule, StreamingModule, TagModule, GenreModule, AnimationInfoModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
