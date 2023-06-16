import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MysqlModule } from './mysql/mysql.module';
import { StreamingModule } from './streaming/streaming.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { AnimationInfoModule } from './animation-info/animation-info.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmExModule } from './typeorm_ex/typeorm_ex.module';

@Module({
  imports: [MysqlModule, StreamingModule, CategoryModule, TagModule, AnimationInfoModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    TypeOrmExModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
