import fastify from 'fastify';

const server = fastify({ logger: true });

// GET                  C-REATE

// POST                 R-EAD

// PUT                  U-UPDATE

// DELETE               D-ELETE

server.get('/', async (req, res) => {
    return { message: 'Hello World' };
});

try {
    server.listen({ port: 3500 });
    console.log('Hello World');
} catch (error) {
    console.log(error);
}