// Config and DB connection
import ormConfig from '../mikro-orm.config';
import { EntityManager, EntityRepository, MikroORM } from '@mikro-orm/postgresql';
import { User } from '../entities/User';
import { Creator } from '../entities/Creator';
import { Podcast } from '../entities/Podcast';
import { Episode } from '../entities/Episode';

export interface Services {
    orm: MikroORM;
    em: EntityManager;
    user: EntityRepository<User>;
    creator: EntityRepository<Creator>;
    podcast: EntityRepository<Podcast>;
    episode: EntityRepository<Episode>;
}

let cache: Services;

export const initDB = async () => {
    if (cache) return cache;

    try {
        const orm = await MikroORM.init(ormConfig);
        console.log(orm.em);
        // Create DB if not exists:
        await orm.getSchemaGenerator().ensureDatabase();

        // Create tables:
        const migrator = orm.getMigrator();
        await migrator.createMigration(); // Just for development phase: to update db with changes in the schemas
        const pendingMigrations = await migrator.getPendingMigrations();

        if (pendingMigrations.length > 0) {
            console.log('Pending migrations:', pendingMigrations);
            await migrator.up();
        }

        return (cache = {
            orm,
            em: orm.em,
            user: orm.em.getRepository(User),
            creator: orm.em.getRepository(Creator),
            podcast: orm.em.getRepository(Podcast),
            episode: orm.em.getRepository(Episode)
        });

    } catch (error) {
        console.error('Error initializing MikroORM:', error);
        throw error;
    }
};

