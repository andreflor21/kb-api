import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeUpdateSupplierUseCase } from '@/use-cases/factories/supplier/make-update-supplier-use-case';

export async function updateSupplier(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const updateSupplierBodySchema = z.object({
        name: z.string().max(100),
        cnpj: z.string().max(14),
        email: z.string().email().max(100).or(z.null()),
        fone: z.string().max(11).or(z.null()),
        legalName: z.string().max(100),
        ERPcode: z.string().max(100),
        code: z.string().max(100),
        userId: z.string().uuid().or(z.null()),
    });

    const { name, cnpj, email, fone, legalName, ERPcode, code, userId } =
        updateSupplierBodySchema.parse(request.body);

    const { supplierId } = z
        .object({
            supplierId: z.string().uuid(),
        })
        .parse(request.params);

    try {
        const updateSupplier = makeUpdateSupplierUseCase();
        const updatedSupplier = await updateSupplier.execute({
            id: supplierId,
            name,
            cnpj,
            email,
            fone,
            legalName,
            ERPCode: ERPcode,
            code,
            userId,
        });

        return reply.status(200).send(updatedSupplier);
    } catch (error) {
        reply.status(500).send();
    }
}

export const updateSupplierSchema = {
    tags: ['Fornecedores'],
    security: [{ BearerAuth: [] }],
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            cnpj: { type: 'string' },
            email: { type: 'string' },
            fone: { type: 'string' },
            legalName: { type: 'string' },
            ERPcode: { type: 'string' },
            code: { type: 'string' },
            userId: { type: 'string' },
        },
        required: ['name', 'cnpj', 'legalName', 'ERPcode', 'code'],
    },
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
                            created_at: { type: 'string' },
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
