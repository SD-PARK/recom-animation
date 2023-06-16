import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique } from 'typeorm';

@Entity('streamings')
@Unique(['streaming'])
export class Streaming extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', comment: '스트리밍 사이트 ID' })
    id: number;

    @Column({ type: 'varchar', length: 45, nullable: false, comment: '사이트명' })
    streaming: string;
}