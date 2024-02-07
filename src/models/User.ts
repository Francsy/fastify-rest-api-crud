import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

type UUID = `${string}-${string}-${string}-${string}-${string}`;
type Role = 'user' | 'admin';

@Entity()
export class User {

    @PrimaryKey({ type: 'uuid' })
    id: UUID = crypto.randomUUID();

    @Property({ length: 50, unique: true })
    username!: string;

    @Property({ length: 100 })
    firstname!: string;

    @Property({ length: 100 })
    lastname!: string;

    @Property({ unique: true })
    email!: string;

    @Property()
    password!: string;

    @Property({ length: 5 })
    role!: Role;

    @Property()
    profile_img_url?: string;

    @Property()
    session_token?: string;

    constructor() {
        this.role = 'user'; // Default value
    }
}
