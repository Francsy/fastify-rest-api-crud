import { Entity, ManyToOne, Property, BeforeCreate } from '@mikro-orm/core';
import { BaseEntity } from './common/baseEntity';
import { Podcast } from './Podcast';
import { Duration } from '../types';


@Entity()
export class Episode extends BaseEntity {

    @Property()
    episodeNum!: number;

    @Property()
    title!: string;

    @Property({ length: 600 })
    description?: string;

    @Property()
    duration!: Duration;

    @Property()
    audioUrl!: string;

    @Property({ type: 'date' })
    releaseDate!: Date;

    @ManyToOne()
    podcast!: Podcast;

    @Property()
    numPlays!: number;

    @BeforeCreate()
    beforeCreateHook() {
        if (typeof this.duration === 'string') {
            this.duration = this.parseDuration(this.duration); // Duration will be transformed from HH:MM:SS string to an object of numbers
        }
    }

    private parseDuration(durationString: string): Duration {
        const [hours, minutes, seconds] = durationString.split(':').map(Number);
        return { hours, minutes, seconds };
    }

    constructor() {
        super();
        this.description = `Welcome to my podcast ${this.episodeNum} episode: ${this.title}. Ready to have fun?`;
        this.numPlays = 0;
    }

}