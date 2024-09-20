import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetAddressByIdUseCase } from '@/use-cases/factories/address/make-get-address-by-id';

export async function getAddressById(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const getAddressByIdParams = z.object({
        id: z.string().uuid(),
    });
    const { id } = getAddressByIdParams.parse(request.params);

    const getAddressById = makeGetAddressByIdUseCase();

    try {
        const address = await getAddressById.execute(id);
        return reply.status(200).send(address);
    } catch (error) {
        return reply.status(500).send();
    }
}

export const getAddressByIdSchema = {
    tags: ['Fornecedores', 'Endereços'],
    security: [{ BearerAuth: [] }],
    params: {
        type: 'object',
        properties: {
            id: { type: 'string', format: 'uuid' },
        },
    },
    response: {
        200: {
            description: 'Success',
            type: 'object',
            properties: {
                id: { type: 'string', format: 'uuid' },
                supplierId: { type: 'string', format: 'uuid' },
                lograd: { type: 'string' },
                number: { type: 'string' },
                zipcode: { type: 'string' },
                city: { type: 'string' },
                state: { type: 'string' },
                district: { type: 'string' },
                complement: { type: 'string' },
                addressType: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        description: { type: 'string' },
                    },
                },
            },
        },
        404: {
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
        500: {
            description: 'Internal Server Error',
            type: 'null',
        },
    },
};
