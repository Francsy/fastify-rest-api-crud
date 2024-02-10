import { OptionalProps, Entity, PrimaryKey, Property } from '@mikro-orm/core';



@Entity({ abstract: true })
export class BaseEntity {

    [OptionalProps]?: 'createdAt' | 'updatedAt';

    @PrimaryKey({ type: 'number', autoincrement: true, unique: true })
    id!: number;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

}