import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetUserByIdUseCase } from '@/use-cases/factories/user/make-get-user-by-id-use-case';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';

export async function getUserById(req: FastifyRequest, res: FastifyReply) {
    const getUserById = makeGetUserByIdUseCase();

    const { id } = z
        .object({
            id: z.string().uuid(),
        })
        .parse(req.params);

    try {
        const { user } = await getUserById.execute({ id });

        res.status(200).send(user);
    } catch (error) {
        if (error instanceof UserNotFoundError) {
            res.status(404).send();
        } else {
            res.status(500).send();
        }
    }
}

export const getUserByIdSchema = {
    schema: {
        tags: ['Usuários'],
        params: {
            type: 'object',
            required: ['id'],
            properties: {
                id: { type: 'string' },
            },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    email: { type: 'string' },
                    cpf: { type: 'string' },
                    birthdate: {
                        type: 'string',
                        format: 'date-time',
                    },
                    createdAt: {
                        type: 'string',
                        format: 'date-time',
                    },
                    changePassword: { type: 'boolean' },
                    tokenReset: { type: 'string' },
                    tokenResetExpires: {
                        type: 'string',
                        format: 'date-time',
                    },
                    profile: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            description: { type: 'string' },
                            routes: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'string' },
                                        description: {
                                            type: 'string',
                                        },
                                    },
                                },
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
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
};
