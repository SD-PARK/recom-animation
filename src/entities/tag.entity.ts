import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: 'recom-animation', name: 'tags' })
export class Tag {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'tag', length: 45 })
    tag: string;
}