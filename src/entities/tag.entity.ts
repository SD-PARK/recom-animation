import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('tags')
@Unique(['tag'])
export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', comment: '태그 ID' })
    id: number;

    @Column({ type: 'varchar', length: 45, nullable: false, comment: '태그명' })
    tag: string;
}