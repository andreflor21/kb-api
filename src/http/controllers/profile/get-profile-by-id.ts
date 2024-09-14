import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ProfileAlreadyExistsError } from '@/shared/errors/profile-already-exists-error';
import { makeGetUserByIdUseCase } from '@/use-cases/factories/profile/make-get-profile-by-id-use-case';

export async function getProfileById(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { id } = z
        .object({
            id: z.string().uuid(),
        })
        .parse(request.params);

    const getProfileById = makeGetUserByIdUseCase();

    try {
        const profile = await getProfileById.execute({
            id,
        });

        reply.status(200).send(profile);
    } catch (error) {
        if (error instanceof ProfileAlreadyExistsError) {
            reply.status(error.statusCode).send({ message: error.message });
        } else {
            reply.status(500).send();
        }
    }
}

export const getProfileByIdSchema = {
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
        },
        required: ['id'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                description: { type: 'string' },
                users: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                            email: { type: 'string' },
                        },
                    },
                },
                routes: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            title: { type: 'string' },
                            description: { type: 'string' },
                            createdAt: { type: 'string' },
                            updatedAt: { type: 'string' },
                        },
                    },
                },
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
