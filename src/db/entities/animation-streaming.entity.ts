import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { AnimationInfo } from "./animation-info.entity";
import { Streaming } from "./streaming.entity";

@Entity('animation_streamings')
export class AnimationStreaming {
    @PrimaryColumn()
    animation_id: number;

    @PrimaryColumn()
    streaming_id: number;

    @ManyToOne(() => AnimationInfo, ani => ani.streamings)
    @JoinColumn({ name: 'animation_id' })
    animation: AnimationInfo;

    @ManyToOne(() => Streaming, streaming => streaming.animations)
    @JoinColumn({ name: 'streaming_id' })
    streaming: Streaming
}