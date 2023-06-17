import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique, OneToMany } from 'typeorm';
import { AnimationStreaming } from './animation-streaming.entity';

@Entity('streamings')
@Unique(['streaming'])
export class Streaming extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', comment: '스트리밍 사이트 ID' })
    id: number;

    @Column({ type: 'varchar', length: 45, nullable: false, comment: '사이트명' })
    streaming: string;

    @OneToMany(() => AnimationStreaming, streaming => streaming.streaming)
    animations: AnimationStreaming[];
}