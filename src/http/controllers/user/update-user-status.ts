import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeUpdateUserStatusUseCase } from '@/use-cases/factories/user/make-update-user-status-use-case';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';

export async function updateUserStatus(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const updateUserStatus = makeUpdateUserStatusUseCase();
    const { id } = z
        .object({
            id: z.string().uuid(),
        })
        .parse(request.params);
    const { status } = z
        .object({
            status: z.boolean(),
        })
        .parse(request.body);

    try {
        await updateUserStatus.execute({ id, status });

        reply.status(204).send();
    } catch (error) {
        if (error instanceof UserNotFoundError) {
            reply.status(error.statusCode).send({ message: error.message });
        } else {
            reply.status(500).send();
        }
    }
}
