import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique, OneToMany } from 'typeorm';
import { AnimationCategory } from './animation-category.entity';

@Entity('categories')
@Unique(['category'])
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', comment: '카테고리 ID' })
    id: number;

    @Column({ type: 'varchar', length: 45, nullable: false, comment: '카테고리명' })
    category: string;

    @OneToMany(() => AnimationCategory, category => category.category)
    animations: AnimationCategory[];
}