import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AnimationTag } from "./animation-tag.entity";

@Entity('animation_infos')
export class AnimationInfo extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', comment: '애니메이션 ID' })
    id: number;

    @Column({ type: 'varchar', length: 90, nullable: false, comment: '작품명' })
    title: string;

    @Column({ type: 'varchar', length: 90, nullable: false, comment: '포스터 이미지' })
    image: string;

    @Column({ type: 'year', nullable: false, comment: '방영년도' })
    aired: number;

    @Column({ type: 'varchar', length: 20, nullable: true, comment: '감독' })
    director: string;

    @Column({ type: 'varchar', length: 20, nullable: false, comment: '스튜디오' })
    studio: string;

    @Column({ type: 'varchar', length: 2000, nullable: true, comment: '설명' })
    summary: string;

    @Column({ type: 'int', nullable: false, comment: '심의 등급' })
    rated: number;
    
    // @OneToMany(() => AnimationTag, animationTag => animationTag.)
}