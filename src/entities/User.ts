import { Collection, Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { UUID, Role } from '../types';
import { Podcast } from './Podcast';
import { createHmac, randomBytes } from 'crypto';


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

    @Property({ hidden: true, lazy: true })
    password!: string;

    @Property({ length: 16, hidden: true, lazy: true })
    salt!: string;

    @Property({ length: 5, default: 'user' })
    role!: Role;

    @Property()
    profileImgUrl?: string;

    @Property()
    sessionToken?: string;

    @ManyToMany(() => Podcast, podcast => podcast.followers, { mappedBy: 'followers' })
    podcasts = new Collection<Podcast>(this);

    @Property({ type: 'date', default: 'NOW()' })
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();



    constructor(email: string, username: string, firstName: string, lastName: string, password: string, profileImgUrl?: string) {
        this.email = email,
            this.username = username,
            this.firstName = firstName,
            this.lastName = lastName,
            this.setPassword(password);
        this.profileImgUrl = profileImgUrl ?? 'https://example.com/images/avatar.jpg'; // This will change to a public static files url served by the API itself
    }

    // Note: @BeforeCreate and @BeforeUpdate life cycle hooks for hashing the password will be a nice future implementation:

    private hashPassword(password: string) {
        const secretKey = process.env.P_KEY || 'your_secret_key';
        return createHmac('sha256', secretKey).update(password + this.salt).digest('hex');
    }

    private setPassword(password: string) {
        this.salt = randomBytes(16).toString();
        this.password = this.hashPassword(password);
    }

    public verifyPassword(password: string): boolean {
        return this.hashPassword(password) === this.password;
    }

    public changePassword(oldPassword: string, newPassword: string): boolean {
        try {
            if (this.verifyPassword(oldPassword)) {
                this.setPassword(newPassword);
                return true;
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(`Error while changing password: ${error.message}`);
            } else {
                console.error('Unknown error changing password');
            }
            return false;
        }
    }
}


