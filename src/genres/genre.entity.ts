import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique } from 'typeorm';

@Entity('genres')
@Unique(['genre'])
export class Genre extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', comment: '장르 ID' })
    id: number;

    @Column({ type: 'varchar', length: 45, nullable: false, comment: '장르명' })
    genre: string;
}