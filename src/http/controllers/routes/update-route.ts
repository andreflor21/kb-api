import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeUpdateRouteUseCase } from '@/use-cases/factories/routes/make-update-route-use-case';
import path from 'node:path';

export const updateRoute = async (
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
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);

    const updateRoute = makeUpdateRouteUseCase();
    try {
        const updatedRoute = await updateRoute.execute({
            id,
            description,
            path,
            method,
        });

        reply.status(200).send(updatedRoute);
    } catch (error) {
        reply.status(500).send();
    }
};

export const updateRouteSchema = {
    tags: ['Rotas'],
    security: [{ BearerAuth: [] }],
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' },
        },
        required: ['id'],
    },
    body: {
        type: 'object',
        properties: {
            description: { type: 'string' },
            path: { type: 'string' },
            method: { type: 'string' },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                description: { type: 'string' },
                path: { type: 'string' },
                method: { type: 'string' },
            },
        },
        404: {
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
    },
};
