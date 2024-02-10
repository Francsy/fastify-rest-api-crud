import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './common/baseEntity';
import { User } from './User';

@Entity()
export class Creator extends BaseEntity {

    @Property({ type: 'string' })
    biography = '';

    @OneToOne()
    associatedUser!: User;

}