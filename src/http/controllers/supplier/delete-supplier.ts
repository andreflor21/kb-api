import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeDeleteSupplierUseCase } from '@/use-cases/factories/supplier/make-delete-supplier-use-case';

export async function deleteSupplier(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { supplierId } = z
        .object({
            supplierId: z.string().uuid(),
        })
        .parse(request.params);

    try {
        const deleteSupplier = makeDeleteSupplierUseCase();
        await deleteSupplier.execute({ id: supplierId });

        return reply.status(204).send();
    } catch (error) {
        reply.status(500).send();
    }
}
