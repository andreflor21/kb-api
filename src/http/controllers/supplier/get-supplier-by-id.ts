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
        properties: {
            supplierId: { type: 'string' },
        },
        required: ['supplierId'],
    },
    response: {
        200: {
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
                userId: { type: 'string' },
                created_at: { type: 'string' },
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
            },
        },
        404: {
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
    },
};
