import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'recom-animation', name: 'genres' })
export class Genre {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'genre', length: 45 })
    genre: string;
}