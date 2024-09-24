import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetSupplierByIdUseCase } from '@/use-cases/factories/supplier/make-get-supplier-by-id-use-case';

export async function getSupplierById(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { supplierId } = z
        .object({
            supplierId: z.string().uuid(),
        })
        .parse(request.params);

    try {
        const getSupplierById = makeGetSupplierByIdUseCase();
        const supplier = await getSupplierById.execute({ id: supplierId });

        return reply.status(200).send(supplier);
    } catch (error) {
        reply.status(500).send();
    }
}

export const getSupplierByIdSchema = {
    tags: ['Fornecedores'],
    security: [{ BearerAuth: [] }],
    params: {
        type: 'object',
        required: ['id', 'supplierId'],
        properties: {
            id: { type: 'string', format: 'uuid' },
            supplierId: { type: 'string', format: 'uuid' },
        },
    },
    response: {
        200: {
            type: 'object',
            description: 'Success',
            properties: {
                supplier: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        fone: { type: 'string' },
                        cnpj: { type: 'string' },
                        ERPcode: { type: 'string' },
                        legalName: { type: 'string' },
                        code: { type: 'string' },
                        active: { type: 'boolean' },
                        created_at: { type: 'string', format: 'date-time' },
                        users: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    name: { type: 'string' },
                                },
                            },
                        },
                        addresses: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    lograd: { type: 'string' },
                                    number: { type: 'string' },
                                    complement: { type: 'string' },
                                    district: { type: 'string' },
                                    city: { type: 'string' },
                                    state: { type: 'string' },
                                    zipcode: { type: 'string' },
                                },
                            },
                        },
                        deliveryDays: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    days: { type: 'number' },
                                    period: { type: 'string' },
                                    hour: { type: 'string' },
                                },
                            },
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
        403: {
            type: 'object',
            description: 'Forbidden',
            properties: {
                message: { type: 'string' },
            },
        },
    },
};
