import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { AnimationTag } from "./animation-tag.entity";

@Entity('tags')
@Unique(['tag'])
export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', comment: '태그 ID' })
    id: number;

    @Column({ type: 'varchar', length: 45, nullable: false, comment: '태그명' })
    tag: string;
    
    @OneToMany(() => AnimationTag, tag => tag.tag)
    animations: AnimationTag[];
}