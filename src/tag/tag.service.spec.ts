import { Test, TestingModule } from '@nestjs/testing';
import { TagService } from './tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from 'src/entities/tag.entity';
import { ConfigService } from '@nestjs/config';

describe('TagService', () => {
  let service: TagService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: async (configService: ConfigService) => ({
            type: 'mysql',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
            entities: [Tag],
            // synchronize: true,
          }),
          inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([Tag])],
      providers: [TagService],
    }).compile();

    service = module.get<TagService>(TagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    
  });

  describe('findOne', () => {

  });

  describe('findAll', () => {

  });

  describe('delete', () => {

  });
});
