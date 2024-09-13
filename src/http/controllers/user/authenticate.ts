import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';
import { InvalidCredentialsError } from '@/shared/errors/invalid-credentcials-error';
import { makeAuthenticateUseCase } from '@/use-cases/factories/user/make-authenticate-use-case';

export async function authenticateUser(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });
    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        const authenticateUser = makeAuthenticateUseCase();
        const { user } = await authenticateUser.execute({
            email,
            password,
        });

        const token = await reply.jwtSign({
            sing: { id: user.id, profile: user.profileId },
        });
        const refreshToken = await reply.jwtSign({
            sing: { id: user.id, profile: user.profileId },
            expiresIn: '10m',
        });

        return reply
            .setCookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: true,
                path: '/',
            })
            .status(200)
            .send({ token, user });
    } catch (error) {
        if (
            error instanceof UserNotFoundError ||
            error instanceof InvalidCredentialsError
        ) {
            reply.status(error.statusCode).send({ message: error.message });
        } else {
            reply.status(500).send();
        }
    }
}

export const authenticateUserSchema = {
    schema: {
        tags: ['Usuários'],
        body: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                email: { type: 'string' },
                password: { type: 'string' },
            },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    token: { type: 'string' },
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
                            }, // Changed to string with date-time format
                            createdAt: {
                                type: 'string',
                                format: 'date-time',
                            }, // Changed to string with date-time format
                            changePassword: { type: 'boolean' },
                            tokenReset: { type: 'string' },
                            tokenResetExpires: {
                                type: 'string',
                                format: 'date-time',
                            }, // Changed to string with date-time format
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
                },
                example: {
                    token: 'string',
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
                },
            },
            401: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
            },
        },
    },
};
