import fastify from 'fastify';
import { userRoutes } from './routes/userRoutes';

const server = fastify({ logger: true });

// GET                  C-REATE
// POST                 R-EAD
// PUT                  U-UPDATE
// DELETE               D-ELETE

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