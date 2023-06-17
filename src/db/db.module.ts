import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Streaming } from 'src/db/entities/streaming.entity';
import { Tag } from 'src/db/entities/tag.entity';
import { Category } from 'src/db/entities/category.entity';
import { AnimationInfo } from './entities/animation-info.entity';
import { AnimationCategory } from './entities/animation-category.entity';
import { AnimationTag } from './entities/animation-tag.entity';
import { AnimationStreaming } from './entities/animation-streaming.entity';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: async (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities: [Streaming, Tag, Category, AnimationInfo, AnimationCategory, AnimationTag, AnimationStreaming],
      // synchronize: true,
    }),
    inject: [ConfigService],
  })],
})
export class DBModule {}
