import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeChangePasswordUseCase } from '@/use-cases/factories/make-change-password-use-case';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';
import { hash } from 'bcryptjs';

export async function changePassword(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const changePassword = makeChangePasswordUseCase();
    const { id } = z
        .object({
            id: z.string().uuid(),
        })
        .parse(request.params);

    const { password } = z
        .object({
            password: z.string().min(6),
        })
        .parse(request.body);

    try {
        await changePassword.execute({ id, password });

        reply.status(204).send();
    } catch (error) {
        if (error instanceof UserNotFoundError) {
            reply.status(error.statusCode).send({ message: error.message });
        } else {
            reply.status(500).send();
        }
    }
}
