import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeLinkProfileToRouteUseCase } from '@/use-cases/factories/profile/make-link-profile-route-use-case';
import { ProfileNotFoundError } from '@/shared/errors/profile-not-found-error';

export async function linkProfileToRoute(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { id, routeId } = z
        .object({
            id: z.string().uuid(),
            routeId: z.string().uuid(),
        })
        .parse(request.params);

    const linkProfileToRoute = makeLinkProfileToRouteUseCase();

    try {
        request.url.endsWith('/link')
            ? await linkProfileToRoute.link({
                  id,
                  routeId,
              })
            : await linkProfileToRoute.unlink({
                  id,
                  routeId,
              });

        reply.status(204).send();
    } catch (error) {
        if (error instanceof ProfileNotFoundError) {
            reply.status(error.statusCode).send({ message: error.message });
        } else {
            reply.status(500).send();
        }
    }
}

export const linkProfileToRouteSchema = {
    tags: ['Perfil'],
    security: [
        {
            BearerAuth: [],
        },
    ],
    params: {
        type: 'object',
        properties: {
            id: { type: 'string', format: 'uuid' },
            routeId: { type: 'string', format: 'uuid' },
        },
        required: ['id', 'routeId'],
    },
    response: {
        204: {
            description: 'Success',
            type: 'null',
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
