import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ProfileAlreadyExistsError } from '@/shared/errors/profile-already-exists-error';
import { makeDuplicateProfileUseCase } from '@/use-cases/factories/profile/make-duplicate-profile-use-case';

export async function duplicateProfile(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { description, profileId } = z
        .object({
            description: z.string().min(3),
            profileId: z.string().uuid(),
        })
        .parse(request.body);

    const duplicateProfile = makeDuplicateProfileUseCase();

    try {
        const newProfile = await duplicateProfile.execute(
            profileId,
            description
        );

        reply.status(201).send(newProfile);
    } catch (error) {
        if (error instanceof ProfileAlreadyExistsError) {
            reply.status(error.statusCode).send({ message: error.message });
        } else {
            reply.status(500).send();
        }
    }
}

export const duplicateProfileSchema = {
    tags: ['Perfil'],
    security: [
        {
            BearerAuth: [],
        },
    ],
    body: {
        type: 'object',
        properties: {
            description: { type: 'string' },
            profileId: { type: 'string' },
        },
        required: ['description', 'profileId'],
    },
    response: {
        201: {
            profile: {
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
                                description: { type: 'string' },
                                createdAt: { type: 'string' },
                            },
                        },
                    },
                },
            },
        },
        400: {
            type: 'object',
            properties: {
                message: { type: 'string' },
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
