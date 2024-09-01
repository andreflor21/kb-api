import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetRouteByIdUseCase } from '@/use-cases/factories/routes/make-get-route-by-id-use-case';

export const getRouteById = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const { id } = z
        .object({
            id: z.string().uuid(),
        })
        .parse(request.params);

    const getRouteById = makeGetRouteByIdUseCase();
    try {
        const route = await getRouteById.execute({ id });

        reply.status(200).send(route);
    } catch (error) {
        reply.status(500).send();
    }
};
