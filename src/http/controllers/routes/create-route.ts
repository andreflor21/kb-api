import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeCreateRouteUseCase } from '@/use-cases/factories/routes/make-create-route-use-case';

export const createRoute = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const { description, path, method } = z
        .object({
            description: z.string().min(3),
            path: z.string().min(3),
            method: z.enum(['GET', 'POST', 'PATCH', 'PUT', 'DELETE']),
        })
        .parse(request.body);

    const createRoute = makeCreateRouteUseCase();
    try {
        const newRoute = await createRoute.execute({
            description,
            path,
            method,
        });

        reply.status(201).send(newRoute);
    } catch (error) {
        reply.status(500).send();
    }
};
