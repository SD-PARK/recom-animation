import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('animations_tags')
export class AnimationTag {
    @Column({ name: 'animation_id', type: 'int', nullable: false })
    animationId: number;

    @Column({ name: 'tag_id', type: 'int', nullable: false })
    tagId: number;
}