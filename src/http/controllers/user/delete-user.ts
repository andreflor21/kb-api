import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeDeleteUserUseCase } from '@/use-cases/factories/user/make-delete-user-use-case';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const deleteUser = makeDeleteUserUseCase();
    const { id } = z
        .object({
            id: z.string().uuid(),
        })
        .parse(request.params);

    try {
        await deleteUser.execute(id);

        reply.status(204).send();
    } catch (error) {
        if (error instanceof UserNotFoundError) {
            reply.status(error.statusCode).send({ message: error.message });
        } else {
            reply.status(500).send();
        }
    }
}

export const deleteUserSchema = {
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
            204: {
                type: 'null',
                description: 'Success',
            },
            404: {
                type: 'object',
                description: 'Not Found',
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
