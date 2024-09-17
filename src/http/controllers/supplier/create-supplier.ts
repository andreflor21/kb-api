import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeCreateSupplierUseCase } from '@/use-cases/factories/supplier/make-create-supplier-use-case';

export async function createSupplier(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const createSupplierBodySchema = z.object({
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
        createSupplierBodySchema.parse(request.body);

    try {
        const createSupplier = makeCreateSupplierUseCase();
        const newSupplier = await createSupplier.execute({
            name,
            cnpj,
            email,
            fone,
            legalName,
            ERPCode: ERPcode,
            code,
            userId,
        });

        return reply.status(201).send(newSupplier);
    } catch (error) {
        reply.status(500).send();
    }
}

export const createSupplierSchema = {
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
    response: {
        201: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                cnpj: { type: 'string' },
                email: { type: 'string' },
                fone: { type: 'string' },
                legalName: { type: 'string' },
                ERPcode: { type: 'string' },
                code: { type: 'string' },
                userId: { type: 'string' },
            },
        },
        400: {
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
    },
};
