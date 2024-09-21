import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeDeleteAddressUseCase } from '@/use-cases/factories/address/make-delete-address-use-case';

export async function deleteAddress(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const deleteAddressParams = z.object({
        addressId: z.string().uuid(),
        supplierId: z.string().uuid(),
    });

    const { supplierId, addressId } = deleteAddressParams.parse(request.params);

    try {
        const deleteAddress = makeDeleteAddressUseCase();
        await deleteAddress.execute({ id: addressId });

        return reply.status(204).send();
    } catch (error) {
        reply.status(500).send();
    }
}

export const deleteAddressSchema = {
    tags: ['Fonecedores', 'Endereços'],
    security: [{ BearerAuth: [] }],
    params: {
        type: 'object',
        properties: {
            addressId: { type: 'string', format: 'uuid' },
            supplierId: { type: 'string', format: 'uuid' },
        },
    },
    response: {
        204: {
            description: 'Success',
            type: 'null',
        },
        500: {
            description: 'Internal Server Error',
            type: 'null',
        },
        403: {
            type: 'object',
            description: 'Forbidden',
            properties: {
                message: { type: 'string' },
            },
        },
    },
};
