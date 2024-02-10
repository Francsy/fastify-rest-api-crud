import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './common/baseEntity';
import { Creator } from './Creator';

@Entity()
export class Podcast extends BaseEntity {

    @ManyToOne()
    podcaster!: Creator;

    @Property()
    title!: string;

    @Property()
    genre!: string;

    @Property({ length: 600 })
    description?: string;

    @Property()
    logoImgUrl?: string;

    @Property()
    backgroundImgUrl?: string;

    @Property()
    numFollowers!: number;

    constructor() {
        super();
        this.description = `Welcome to ${this.title}!! Tune in to this new Podcast for captivating conversations on ${this.genre}. Subscribe now to stay ahead!`;
        this.numFollowers = 0;
    }
}