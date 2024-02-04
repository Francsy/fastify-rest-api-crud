import fastify from 'fastify';

const server = fastify({ logger: true });

server.listen({ port: 3500 });