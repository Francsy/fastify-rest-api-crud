import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './common/baseEntity';
import { User } from './User';

@Entity()
export class Creator extends BaseEntity {

    @OneToOne({ entity: () => User, orphanRemoval: true, deleteRule: 'cascade' })
    associatedUser!: User;

    @Property({ length: 600 })
    biography!: string;

    constructor(associatedUser: User, biography: string) {
        super();
        this.associatedUser = associatedUser;
        this.biography = biography;
    }
}