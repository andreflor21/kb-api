import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetUserByEmailUseCase } from '@/use-cases/factories/user/make-get-user-by-email-use-case';
import { makeUpdateTokenUseCase } from '@/use-cases/factories/user/make-update-token-use-case';
import { sendMail } from '@/shared/email/SendEmail';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';
import { randomUUID } from 'crypto';
import path from 'path';

interface TemplateResetPassword {
    name: string;
    url: string;
    token: string;
}

export async function forgotPassword(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { email } = z
        .object({
            email: z.string().email(),
        })
        .parse(request.body);

    try {
        const getUserByEmail = makeGetUserByEmailUseCase();
        const updateToken = makeUpdateTokenUseCase();
        const { user } = await getUserByEmail.execute({ email });
        if (user) {
            const token = randomUUID();
            const expireDate = new Date();
            expireDate.setHours(expireDate.getHours() + 1);

            await updateToken.execute({ id: user.id, token, date: expireDate });

            const templateData: TemplateResetPassword = {
                name: user.name,
                url: `${process.env.APP_URL}/reset-password/${token}`,
                token,
            };
            sendMail<TemplateResetPassword>({
                subject: 'Recuperação de senha',
                templateData,
                templatePath: path.join(
                    __dirname,
                    '../../../shared/email/forgotPasswordEmail.html'
                ),
                to: user.email,
            });

            reply.status(200).send({
                message: `Email enviado com sucesso para ${user.email}`,
                token,
                expires: expireDate,
            });
        }
    } catch (error) {
        if (error instanceof UserNotFoundError)
            reply.status(error.statusCode).send({ message: error.message });

        reply.status(500).send();
    }
}

export const forgotPasswordSchema = {
    schema: {
        tags: ['Usuários'],
        body: {
            type: 'object',
            required: ['email'],
            properties: {
                email: { type: 'string' },
            },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    token: { type: 'string' },
                    expires: { type: 'string', format: 'date-time' },
                },
            },
            404: {
                type: 'object',
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
        },
    },
};
