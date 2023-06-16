import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Streaming } from 'src/entities/streaming.entity';
import { Tag } from 'src/entities/tag.entity';
import { Category } from 'src/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: async (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities: [Streaming, Tag, Category],
      // synchronize: true,
    }),
    inject: [ConfigService],
  })],
})
export class MysqlModule {}
