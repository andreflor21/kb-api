import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeDeleteAddressUseCase } from '@/use-cases/factories/address/make-delete-address-use-case';

export async function deleteAddress(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const deleteAddressParams = z.object({
        addressId: z.string().uuid(),
        supplierId: z.string().uuid(),
    });

    const { supplierId, addressId } = deleteAddressParams.parse(request.params);

    try {
        const deleteAddress = makeDeleteAddressUseCase();
        await deleteAddress.execute({ id: addressId });

        return reply.status(204).send();
    } catch (error) {
        reply.status(500).send();
    }
}
