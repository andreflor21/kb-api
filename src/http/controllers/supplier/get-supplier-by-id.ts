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
