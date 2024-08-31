import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { UserAlreadyExistsError } from '@/shared/errors/user-already-exists-error';
import { makeCreateUserUseCase } from '@/use-cases/factories/user/make-create-user-use-case';

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password, cpf, birthdate, code, profileId } = z
        .object({
            name: z.string().min(3),
            email: z.string().email(),
            password: z.string().min(6),
            cpf: z.string().optional(),
            birthdate: z.coerce.date().optional(),
            code: z.string().optional(),
            profileId: z.string().uuid(),
        })
        .parse(request.body);

    const createUser = makeCreateUserUseCase();

    try {
        const newUser = await createUser.execute({
            name,
            email,
            password,
            cpf: cpf ?? null,
            birthdate: birthdate ?? null,
            code: code ?? null,
            profileId,
        });

        reply.status(201).send(newUser);
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            reply.status(409).send();
        } else {
            reply.status(500).send();
        }
    }
}
