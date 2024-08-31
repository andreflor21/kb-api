import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeRecoverPasswordUseCase } from '@/use-cases/factories/make-recover-password-use-case';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';
import { ExpiredTokenError } from '@/shared/errors/expired-token-error';

export async function recoverPassword(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const recoverPassword = makeRecoverPasswordUseCase();
    const { token_id } = z
        .object({
            token_id: z.string().uuid(),
        })
        .parse(request.params);
    const { password } = z
        .object({
            password: z.string().min(6),
        })
        .parse(request.body);

    try {
        await recoverPassword.execute({ token: token_id, password });

        reply.status(204).send();
    } catch (error) {
        if (
            error instanceof UserNotFoundError ||
            error instanceof ExpiredTokenError
        ) {
            reply.status(error.statusCode).send({ message: error.message });
        } else {
            reply.status(500).send();
        }
    }
}
