import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { AnimationInfo } from "./animation-info.entity";
import { Tag } from "./tag.entity";

@Entity('animation_tags')
export class AnimationTag {
    @PrimaryColumn()
    animation_id: number;
    
    @PrimaryColumn()
    tag_id: number;

    @ManyToOne(() => AnimationInfo, ani => ani.tags)
    @JoinColumn({ name: 'animation_id' })
    animation: AnimationInfo;

    @ManyToOne(() => Tag, tag => tag.animations)
    @JoinColumn({ name: 'tag_id' })
    tag: Tag;
}