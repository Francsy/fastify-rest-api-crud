import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './common/baseEntity';

@Entity()
export class Creators extends BaseEntity {

    @Property({ type: 'string' })
    biography = '';

}