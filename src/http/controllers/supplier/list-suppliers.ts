import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeListSuppliersUseCase } from '@/use-cases/factories/supplier/make-list-suppliers-use-case';

export async function listSuppliers(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const listSuppliers = makeListSuppliersUseCase();
    const suppliers = await listSuppliers.execute();

    return reply.status(200).send(suppliers);
}

export const listSuppliersSchema = {
    tags: ['Fornecedores'],
    security: [{ BearerAuth: [] }],
    response: {
        200: {
            suppliers: {
                type: 'array',
                items: {
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
                        created_at: { type: 'string' },
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
                    },
                },
            },
        },
    },
};
