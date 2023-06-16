import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique } from 'typeorm';

@Entity('categories')
@Unique(['category'])
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', comment: '카테고리 ID' })
    id: number;

    @Column({ type: 'varchar', length: 45, nullable: false, comment: '카테고리명' })
    category: string;
}