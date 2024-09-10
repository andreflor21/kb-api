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
