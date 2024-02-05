import { RouteOptions } from 'fastify';

export const userRoutes: RouteOptions[] = [
    {
        method: 'POST',
        url: '/users',
        handler: async (req, res) => {
            res.status(200).send({ status: 'OK - POST' });
        }
    }
];
