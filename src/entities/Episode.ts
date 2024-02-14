import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './common/baseEntity';
import { Podcast } from './Podcast';
import { Duration, DurationString } from '../types';


@Entity()
export class Episode extends BaseEntity {

    @Property()
    episodeRef!: string;

    @Property()
    title!: string;

    @Property({ length: 600 })
    description?: string;

    @ManyToOne()
    podcast!: Podcast;

    @Property()
    duration!: Duration;

    @Property()
    audioUrl!: string;

    @Property({ type: 'date' })
    releaseDate!: Date;


    @Property()
    numPlays!: number;


    private parseDuration(durationString: DurationString): Duration {
        const [hours, minutes, seconds] = durationString.split(':').map(Number);
        return { hours, minutes, seconds };
    }

    constructor(
        episodeRef: string,
        title: string,
        duration: DurationString | Duration,
        audioUrl: string,
        releaseDate: Date,
        podcast: Podcast,
        description?: string) {

        super();
        this.episodeRef = episodeRef;
        this.title = title;
        this.duration = typeof duration === 'string' ? this.parseDuration(duration) : duration;
        this.audioUrl = audioUrl;
        this.releaseDate = releaseDate;
        this.podcast = podcast;
        this.description = description ?? `Welcome to my podcast ${this.episodeRef} episode: ${this.title}. Ready to have fun?`;
        this.numPlays = 0;
    }

}