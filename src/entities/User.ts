import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { UUID, Role } from '../types';

@Entity()
export class User {

    @PrimaryKey({ type: 'uuid', unique: true })
    id: UUID = crypto.randomUUID();

    @Property({ length: 50, unique: true, index: true })
    username!: string;

    @Property({ length: 100 })
    firstname!: string;

    @Property({ length: 100 })
    lastname!: string;

    @Property({ unique: true, index: true })
    email!: string;

    @Property()
    password!: string;

    @Property({ length: 5 })
    role!: Role;

    @Property()
    profileImgUrl?: string;

    @Property()
    sessionToken?: string;

    @Property()
    createdAt = new Date();


    constructor() {
        this.role = 'user'; // Default value
    }
}
