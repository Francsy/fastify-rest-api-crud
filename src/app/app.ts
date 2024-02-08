// import { RequestContext } from '@mikro-orm/postgresql';
import fastify from 'fastify';
import initDB from '../utils/db';
import cors from '@fastify/cors';
import { userRoutes } from '../routes/userRoutes';

export const bootstrap = async (port = 3500) => {
    const db = initDB();
    const server = fastify({ logger: true });
    server.register(cors, {});

    server.get('/', async () => {
        return { message: 'Hello World' };
    });

    userRoutes.forEach(userRoute => {
        server.route(userRoute);
    });

    const url = await server.listen({ port });

    return { server, url };
};