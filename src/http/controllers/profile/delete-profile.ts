import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeDeleteProfileUseCase } from '@/use-cases/factories/profile/make-delete-profile-use-case';
import { ProfileNotFoundError } from '@/shared/errors/profile-not-found-error';

export async function deleteProfile(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const { id } = z.object({ id: z.string() }).parse(request.params);

        const deleteProfile = makeDeleteProfileUseCase();
        await deleteProfile.execute(id);
        reply.status(204).send();
    } catch (error) {
        if (error instanceof ProfileNotFoundError) {
            reply.status(error.statusCode).send({ message: error.message });
        } else {
            reply.status(500).send();
        }
    }
}

export const deleteProfileSchema = {
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
    response: {
        204: {
            description: 'Success',
            type: 'null',
        },
        404: {
            description: 'Not found',
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
        403: {
            description: 'Forbidden',
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
