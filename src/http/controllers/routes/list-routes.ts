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
