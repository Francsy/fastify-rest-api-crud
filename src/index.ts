import 'dotenv/config'; // For development. In production, we can change the start script in Node new versions to add the .env: "node --env-file .env src/index.js"
import fastify from 'fastify';
import { userRoutes } from './routes/userRoutes';
import cors from '@fastify/cors';
import initDB from './utils/db';

const server = fastify({ logger: true });

server.register(cors, {});

// GET                  C-REATE
// POST                 R-EAD
// PUT                  U-UPDATE
// DELETE               D-ELETE
const orm = initDB();

server.get('/', async () => {
    return { message: 'Hello World' };
});


userRoutes.forEach(userRoute => {
    server.route(userRoute);
});


const port: number = 3500;

const start = async () => {
    try {
        await server.listen({ port });
        console.log(`Server is running on ${port}`);
    } catch (error) {
        console.log('An error ocurred:', error);
        process.exit(1);
    }
};

start();