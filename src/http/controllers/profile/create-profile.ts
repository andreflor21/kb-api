import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ProfileAlreadyExistsError } from '@/shared/errors/profile-already-exists-error';
import { makeCreateProfileUseCase } from '@/use-cases/factories/profile/make-create-profile-use-case';

export async function createProfile(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { description } = z
        .object({
            description: z.string().min(3),
        })
        .parse(request.body);

    const createProfile = makeCreateProfileUseCase();

    try {
        const newProfile = await createProfile.execute({
            description,
        });

        reply.status(201).send(newProfile);
    } catch (error) {
        if (error instanceof ProfileAlreadyExistsError) {
            reply.status(error.statusCode).send({ message: error.message });
        } else {
            reply.status(500).send();
        }
    }
}
