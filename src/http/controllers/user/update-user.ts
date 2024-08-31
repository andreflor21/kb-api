import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeUpdateUserUseCase } from '@/use-cases/factories/make-update-user-use-case';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';
import { UserAlreadyExistsError } from '@/shared/errors/user-already-exists-error';

export async function updateUserStatus(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const updateUserStatus = makeUpdateUserUseCase();
    const { id } = z
        .object({
            id: z.string().uuid(),
        })
        .parse(request.params);
    const { name, email, cpf, birthdate, code, profileId } = z
        .object({
            name: z.string(),
            email: z.string().email(),
            cpf: z.string(),
            birthdate: z.coerce.date(),
            code: z.string(),
            profileId: z.string().uuid(),
        })
        .parse(request.body);

    try {
        await updateUserStatus.execute({
            id,
            name,
            email,
            cpf,
            birthdate,
            code,
            profileId,
        });

        reply.status(204).send();
    } catch (error) {
        if (
            error instanceof UserNotFoundError ||
            error instanceof UserAlreadyExistsError
        ) {
            reply.status(error.statusCode).send({ message: error.message });
        } else {
            reply.status(500).send();
        }
    }
}
