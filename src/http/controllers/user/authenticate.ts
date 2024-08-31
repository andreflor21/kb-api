import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';
import { InvalidCredentialsError } from '@/shared/errors/invalid-credentcials-error';
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case';

export async function authenticateUser(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });
    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        const authenticateUser = makeAuthenticateUseCase();
        const { user } = await authenticateUser.execute({
            email,
            password,
        });

        const token = await reply.jwtSign({
            sing: { id: user.id, profile: user.profileId },
        });
        const refreshToken = await reply.jwtSign({
            sing: { id: user.id, profile: user.profileId },
            expiresIn: '10m',
        });

        return reply
            .setCookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: true,
                path: '/',
            })
            .status(200)
            .send({ token });
    } catch (error) {
        if (
            error instanceof UserNotFoundError ||
            error instanceof InvalidCredentialsError
        ) {
            reply.status(error.statusCode).send({ message: error.message });
        } else {
            reply.status(500).send();
        }
    }
}
