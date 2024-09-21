import { FastifyRequest, FastifyReply } from 'fastify';
import { makeListProfileUseCase } from '@/use-cases/factories/profile/make-list-profiles-use-case';

export async function listProfiles(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const listProfiles = makeListProfileUseCase();

    const profiles = await listProfiles.execute();

    reply.status(200).send(profiles);
}

export const listProfilesSchema = {
    tags: ['Perfil'],
    security: [
        {
            BearerAuth: [],
        },
    ],
    response: {
        200: {
            description: 'Success',
            type: 'object',
            properties: {
                profiles: {
                    type: 'array',
                    items: {
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
                        },
                    },
                    routes: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                description: { type: 'string' },
                                method: { type: 'string' },
                            },
                        },
                    },
                },
            },
        },
        401: {
            description: 'Unauthorized',
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
    },
};
