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
