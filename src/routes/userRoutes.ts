import { RouteOptions } from 'fastify';

interface userParams {
    id?: string,
    email?: string
}

interface userRegistrationBody {
    email: string,
    password: string,
    confirmPassword: string
}



export const userRoutes: RouteOptions[] = [
    {
        method: 'GET',
        url: '/users',
        handler: async (req, res) => {
            res.status(200).send({ status: 'OK - GET ALL USERS' });
        }
    },
    {
        method: 'POST',
        url: '/users',
        handler: async (req, res) => {
            const { email, password, confirmPassword } = req.body as userRegistrationBody;
            if (email && (password === confirmPassword)) res.status(200).send({ status: `New user created with email ${email}` });
            else res.status(401).send({ status: 'Invalid credentials' });
        }
    },
    {
        method: 'PUT',
        url: '/users/:id',
        handler: async (req, res) => {
            const { id } = req.params as userParams;
            res.status(200).send({ status: `OK - Edit user: ${id}`, id });
        }
    },
    {
        method: 'DELETE',
        url: '/users/:id',
        handler: async (req, res) => {
            const { id } = req.params as userParams;
            res.status(200).send({ status: `OK - Delete user: ${id}`, id });
        }
    },
];
