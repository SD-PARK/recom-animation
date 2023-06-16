import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'recom-animation', name: 'streamings' })
export class Streaming {
    @PrimaryGeneratedColumn({type: 'int', name: 'id'})
    id: number;

    @Column('varchar', {name: 'streaming', length: 45})
    streaming: string;
}