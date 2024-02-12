import { Collection, Entity, ManyToMany, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './common/baseEntity';
import { Creator } from './Creator';
import { User } from './User';
import { Genre } from '../types';

@Entity()
export class Podcast extends BaseEntity {

    @Property()
    title!: string;

    @Property()
    genre!: Genre;

    @ManyToOne()
    podcaster!: Creator;

    @Property({ length: 600 })
    description?: string;

    @Property({ nullable: true })
    logoImgUrl?: string;

    @Property({ nullable: true })
    backgroundImgUrl?: string;

    @ManyToMany({ entity: () => User })
    followers = new Collection<User>(this);

    @Property()
    numFollowers!: number;

    constructor(title: string, genre: Genre, podcaster: Creator) {
        super();
        this.title = title;
        this.genre = genre;
        this.podcaster = podcaster;
        this.description = `Welcome to ${this.title}!! Tune in to this new Podcast for captivating conversations on ${this.genre}. Subscribe now to stay ahead!`;
        this.numFollowers = 0;
    }
}