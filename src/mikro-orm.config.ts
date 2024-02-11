import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';
import { Migrator } from '@mikro-orm/migrations';
import { User } from './entities/User';
import { Creator } from './entities/Creator';
import { Podcast } from './entities/Podcast';
import { Episode } from './entities/Episode';
import 'dotenv/config'; // For development. In production, we can change the start script in Node new versions to add the .env: "node --env-file .env src/index.js"


const ormConfig: Options = {
    entities: [User, Creator, Podcast, Episode],
    dbName: 'db_podcasts',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST ?? 'localhost',
    port: process.env.DB_PORT ? Number(process.env.PORT) : 5432,
    clientUrl: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST ?? 'localhost'}:${process.env.DB_PORT ? Number(process.env.PORT) : 5432}/db_podcasts`,
    debug: true,
    driver: PostgreSqlDriver,
    extensions: [Migrator, SeedManager]
};

export default ormConfig;