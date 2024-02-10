import { Collection, Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { UUID, Role } from '../types';
import { Podcast } from './Podcast';

@Entity()
export class User {

    @PrimaryKey({ type: 'uuid', unique: true, index: true })
    id: UUID = crypto.randomUUID();

    @Property({ unique: true, index: true })
    email!: string;

    @Property({ length: 50, unique: true, index: true })
    username!: string;

    @Property({ length: 100 })
    firstName!: string;

    @Property({ length: 100 })
    lastName!: string;

    @Property()
    password!: string;

    @Property({ length: 5, default: 'user' })
    role!: Role;

    @Property()
    profileImgUrl?: string;

    @Property()
    sessionToken?: string;

    @ManyToMany(() => Podcast, podcast => podcast.followers)
    podcasts = new Collection<Podcast>(this);

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();



    constructor(email: string, username: string, firstName: string, lastName: string, password: string, profileImgUrl?: string) {
        this.email = email,
            this.username = username,
            this.firstName = firstName,
            this.lastName = lastName,
            this.password = password,
            this.profileImgUrl = profileImgUrl ?? 'https://example.com/images/avatar.jpg'; // This will change to a public static files url served by the API itself
    }
}
