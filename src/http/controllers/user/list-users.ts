import { verifyJwt } from '@/http/middleware/verifyJwt';
import { makeListUsersUseCase } from '@/use-cases/factories/user/make-list-users-use-case';
import { on } from 'events';
import { FastifyRequest, FastifyReply } from 'fastify';

export async function listUsers(req: FastifyRequest, res: FastifyReply) {
    const listUsers = makeListUsersUseCase();

    const users = await listUsers.execute();

    res.status(200).send(users);
}

export const listUsersSchema = {
    schema: {
        tags: ['Usuários'],
        security: [{ BearerAuth: [] }],
        response: {
            200: {
                users: {
                    type: 'array',
                    items: {
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
                },
            },
        },
    },
    onRequest: [verifyJwt],
};
