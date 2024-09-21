import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { UserAlreadyExistsError } from '@/shared/errors/user-already-exists-error';
import { makeCreateUserUseCase } from '@/use-cases/factories/user/make-create-user-use-case';
import { sendNewUserEmail } from '@/http/utils/send-new-user-email';

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password, cpf, birthdate, code, profileId } = z
        .object({
            name: z.string().min(3),
            email: z.string().email(),
            password: z.string().min(6),
            cpf: z.string().optional(),
            birthdate: z.coerce.date().optional(),
            code: z.string().optional(),
            profileId: z.string().uuid(),
        })
        .parse(request.body);

    const createUser = makeCreateUserUseCase();

    try {
        const { user } = await createUser.execute({
            name,
            email,
            password,
            cpf: cpf ?? null,
            birthdate: birthdate ?? null,
            code: code ?? null,
            profileId,
        });
        if (user) {
            const ret = await sendNewUserEmail({
                id: user.id as string,
                email,
                name,
            });
            if (ret.statusCode == 200) {
                reply.status(201).send({
                    user,
                    message: ret.message,
                    token: ret.token,
                    expires: ret.expires,
                });
            } else {
                reply.status(ret.statusCode).send({ message: ret.message });
            }
        }
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            reply.status(409).send({ message: error.message });
        }
    }
}

export const createUserSchema = {
    schema: {
        tags: ['Usuários'],
        body: {
            type: 'object',
            required: ['name', 'email', 'password', 'profileId'],
            properties: {
                name: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
                cpf: { type: 'string' },
                birthdate: { type: 'string', format: 'date-time' },
                code: { type: 'string' },
                profileId: { type: 'string' },
            },
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    user: {
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
                    message: { type: 'string' },
                    token: { type: 'string' },
                    expires: { type: 'string', format: 'date-time' },
                },
                example: {
                    user: {
                        id: 'string',
                        name: 'string',
                        email: 'string',
                        cpf: 'string',
                        birthdate: '2023-01-01T00:00:00.000Z', // Example in ISO 8601 format
                        createdAt: '2023-01-01T00:00:00.000Z',
                        changePassword: false,
                        tokenReset: 'string',
                        tokenResetExpires: '2023-01-01T00:00:00.000Z',
                        profile: {
                            id: 'string',
                            description: 'string',
                            routes: [
                                {
                                    id: 'string',
                                    description: 'string',
                                },
                            ],
                        },
                    },
                    message: 'string',
                    token: 'string',
                    expires: '2023-01-01T00:00:00.000Z',
                },
            },
            400: {
                type: 'object',
                description: 'Bad Request',
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
            409: {
                type: 'object',
                description: 'Conflict',
                properties: {
                    message: { type: 'string' },
                },
            },
        },
    },
};
