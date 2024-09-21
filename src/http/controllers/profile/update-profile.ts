import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeUpdateProfileUseCase } from '@/use-cases/factories/profile/make-update-profile-use-case';
import { ProfileNotFoundError } from '@/shared/errors/profile-not-found-error';
import { ProfileAlreadyExistsError } from '@/shared/errors/profile-already-exists-error';

export async function updateProfile(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const { id } = z.object({ id: z.string() }).parse(request.params);

        const { description, users, routes } = z
            .object({
                description: z.string().min(3),
                users: z.array(z.string()),
                routes: z.array(z.string()),
            })
            .parse(request.body);

        const updateProfile = makeUpdateProfileUseCase();
        await updateProfile.execute({
            id,
            description,
            users: users ?? [],
            routes: routes ?? [],
        });
        reply.status(204).send();
    } catch (error) {
        if (
            error instanceof ProfileNotFoundError ||
            error instanceof ProfileAlreadyExistsError
        ) {
            reply.status(error.statusCode).send({ message: error.message });
        } else {
            reply.status(500).send();
        }
    }
}

export const updateProfileSchema = {
    tags: ['Perfil'],
    security: [
        {
            BearerAuth: [],
        },
    ],
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
            users: { type: 'array', items: { type: 'string' } },
            routes: { type: 'array', items: { type: 'string' } },
        },
        required: ['description'],
    },
    response: {
        204: {
            description: 'Success',
            type: 'null',
        },
        403: {
            description: 'Forbiden',
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
        404: {
            description: 'Not Found',
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
        401: {
            description: 'Unauthorized',
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
        500: {
            description: 'Internal Server Error',
            type: 'null',
        },
    },
};
