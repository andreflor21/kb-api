import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeUpdateSupplierStatusUseCase } from '@/use-cases/factories/supplier/make-update-supplier-status-use-case';

export async function updateSupplierStatus(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const updateSupplierStatusBodySchema = z.object({
        status: z.boolean(),
    });

    const { status } = updateSupplierStatusBodySchema.parse(request.body);

    const { supplierId } = z
        .object({
            supplierId: z.string().uuid(),
        })
        .parse(request.params);

    try {
        const updateSupplierStatus = makeUpdateSupplierStatusUseCase();
        const updatedSupplier = await updateSupplierStatus.execute({
            id: supplierId,
            status,
        });

        return reply.status(200).send(updatedSupplier);
    } catch (error) {
        reply.status(500).send();
    }
}
