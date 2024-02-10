import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './common/baseEntity';
import { Podcast } from './Podcast';
import { Duration, DurationString } from '../types';


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


    private parseDuration(durationString: DurationString): Duration {
        const [hours, minutes, seconds] = durationString.split(':').map(Number);
        return { hours, minutes, seconds };
    }

    constructor(episodeNum: number,
        title: string,
        duration: DurationString | Duration,
        audioUrl: string,
        releaseDate: Date,
        podcast: Podcast,
        description: string) {

        super();
        this.episodeNum = episodeNum;
        this.title = title;
        this.duration = typeof duration === 'string' ? this.parseDuration(duration) : duration;
        this.audioUrl = audioUrl;
        this.releaseDate = releaseDate;
        this.podcast = podcast;
        this.description = description ?? `Welcome to my podcast ${this.episodeNum} episode: ${this.title}. Ready to have fun?`;
        this.numPlays = 0;
    }

}