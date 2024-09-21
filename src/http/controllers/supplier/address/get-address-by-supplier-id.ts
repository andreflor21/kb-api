import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetAddressBySupplierIdUseCase } from '@/use-cases/factories/address/make-get-address-by-supplier-id';

export async function getAddressBySupplierId(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const getAddressBySupplierIdParams = z.object({
        supplierId: z.string().uuid(),
    });
    const { supplierId } = getAddressBySupplierIdParams.parse(request.params);

    const getAddressBySupplierId = makeGetAddressBySupplierIdUseCase();

    try {
        const addresses = await getAddressBySupplierId.execute(supplierId);
        return reply.status(200).send(addresses);
    } catch (error) {
        return reply.status(500).send();
    }
}

export const getAddressBySupplierIdSchema = {
    tags: ['Fonecedores', 'Endereços'],
    security: [{ BearerAuth: [] }],
    params: {
        type: 'object',
        properties: {
            supplierId: { type: 'string', format: 'uuid' },
        },
    },
    response: {
        200: {
            description: 'Success',
            type: 'array',
            items: {
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
        },
        404: {
            type: 'object',
            description: 'Not Found',
            properties: {
                message: { type: 'string' },
            },
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
