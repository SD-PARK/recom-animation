import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MysqlModule } from './mysql/mysql.module';
import { StreamingModule } from './streaming/streaming.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MysqlModule, StreamingModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
