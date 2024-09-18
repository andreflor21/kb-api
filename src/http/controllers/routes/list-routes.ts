import { FastifyRequest, FastifyReply } from 'fastify';
import { makeListRoutesUseCase } from '@/use-cases/factories/routes/make-list-routes-use-case';

export const listRoutes = async (_: FastifyRequest, reply: FastifyReply) => {
    const listRoutes = makeListRoutesUseCase();
    try {
        const routes = await listRoutes.execute();

        reply.status(201).send(routes);
    } catch (error) {
        reply.status(500).send();
    }
};

export const listRoutesSchema = {
    tags: ['Rotas'],
    security: [{ BearerAuth: [] }],
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    description: { type: 'string' },
                },
            },
        },
    },
};
