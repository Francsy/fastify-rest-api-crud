// Config and DB connection

import { MikroORM } from '@mikro-orm/postgresql';
import { User } from '../models/User';
import { Migrator } from '@mikro-orm/migrations';

const initDB = async () => {
    try {
        const orm = await MikroORM.init({
            entities: [User],
            dbName: 'db_podcasts',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST ?? 'localhost',
            port: process.env.DB_PORT ? Number(process.env.PORT) : 5432,
            debug: true,
            extensions: [Migrator]
        });
        console.log(orm.em);
        // Create DB if not exists:
        await orm.getSchemaGenerator().ensureDatabase();

        // Create tables:
        const migrator = orm.getMigrator();
        await migrator.createMigration(); // Just for development phase: to update the changes in the schemas in the db
        const pendingMigrations = await migrator.getPendingMigrations();

        if (pendingMigrations.length > 0) {
            console.log('Pending migrations:', pendingMigrations);
            await migrator.up();
        }

        return orm;
    } catch (error) {
        console.error('Error initializing MikroORM:', error);
        throw error;
    }
};

export default initDB;