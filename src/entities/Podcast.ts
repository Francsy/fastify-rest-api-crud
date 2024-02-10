import { Collection, Entity, ManyToMany, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './common/baseEntity';
import { Creator } from './Creator';
import { User } from './User';

@Entity()
export class Podcast extends BaseEntity {

    @Property()
    title!: string;

    @Property()
    genre!: string;

    @ManyToOne()
    podcaster!: Creator;

    @Property({ length: 600 })
    description?: string;

    @Property()
    logoImgUrl?: string;

    @Property()
    backgroundImgUrl?: string;

    @ManyToMany(() => User, user => user.podcasts)
    followers = new Collection<User>(this);

    @Property()
    numFollowers!: number;


    constructor(title: string, genre: string, podcaster: Creator) {
        super();
        this.title = title;
        this.genre = genre;
        this.podcaster = podcaster;
        this.description = `Welcome to ${this.title}!! Tune in to this new Podcast for captivating conversations on ${this.genre}. Subscribe now to stay ahead!`;
        this.numFollowers = 0;
    }
}