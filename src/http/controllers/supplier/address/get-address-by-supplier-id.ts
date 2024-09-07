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
