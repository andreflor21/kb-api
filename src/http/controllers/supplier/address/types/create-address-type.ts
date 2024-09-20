import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeCreateAddressTypeUseCase } from '@/use-cases/factories/address/types/make-create-address-type-use-case';

export async function createAddressType(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const createAddressTypeSchema = z.object({
        description: z.string().max(100),
    });

    const { description } = createAddressTypeSchema.parse(request.body);

    const createAddressType = makeCreateAddressTypeUseCase();

    try {
        const newAddressType = await createAddressType.execute({
            description,
        });

        reply.status(201).send(newAddressType);
    } catch (error) {
        reply.status(500).send();
    }
}
export const createAddressTypeSchema = {
    tags: ['Tipos de Endereços'],
    security: [{ BearerAuth: [] }],
    body: {
        type: 'object',
        properties: {
            description: { type: 'string' },
        },
    },
    response: {
        201: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                description: { type: 'string' },
            },
        },
        400: {
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
        500: {
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
    },
};
