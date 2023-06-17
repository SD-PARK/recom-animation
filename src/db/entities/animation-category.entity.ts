import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { AnimationInfo } from "./animation-info.entity";
import { Category } from "./category.entity";

@Entity('animation_categories')
export class AnimationCategory {
    @PrimaryColumn()
    animation_id: number;

    @PrimaryColumn()
    category_id: number;
    
    @ManyToOne(() => AnimationInfo, ani => ani.categories)
    @JoinColumn({ name: 'animation_id' })
    animation: AnimationInfo;

    @ManyToOne(() => Category, category => category.animations)
    @JoinColumn({ name: 'category_id' })
    category: Category;
}