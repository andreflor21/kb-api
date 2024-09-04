import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ProfileAlreadyExistsError } from '@/shared/errors/profile-already-exists-error';
import { makeGetUserByIdUseCase } from '@/use-cases/factories/profile/make-get-profile-by-id-use-case';

export async function getProfileById(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { id } = z
        .object({
            id: z.string().uuid(),
        })
        .parse(request.params);

    const getProfileById = makeGetUserByIdUseCase();

    try {
        const profile = await getProfileById.execute({
            id,
        });

        reply.status(200).send(profile);
    } catch (error) {
        if (error instanceof ProfileAlreadyExistsError) {
            reply.status(error.statusCode).send({ message: error.message });
        } else {
            reply.status(500).send();
        }
    }
}
