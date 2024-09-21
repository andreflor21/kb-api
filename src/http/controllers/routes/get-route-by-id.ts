import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetRouteByIdUseCase } from '@/use-cases/factories/routes/make-get-route-by-id-use-case';
import path from 'node:path';

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

export const getRouteByIdSchema = {
    tags: ['Rotas'],
    security: [{ BearerAuth: [] }],
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' },
        },
        required: ['id'],
    },
    response: {
        200: {
            description: 'Success',
            type: 'object',
            properties: {
                id: { type: 'string' },
                description: { type: 'string' },
                path: { type: 'string' },
                method: { type: 'string' },
            },
        },
        404: {
            description: 'Not Found',
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
        403: {
            type: 'object',
            description: 'Forbidden',
            properties: {
                message: { type: 'string' },
            },
        },
        401: {
            type: 'object',
            description: 'Unauthorized',
            properties: {
                message: { type: 'string' },
            },
        },
    },
};
