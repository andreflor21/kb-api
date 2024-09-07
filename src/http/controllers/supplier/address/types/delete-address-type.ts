import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeDeleteAddressTypeUseCase } from '@/use-cases/factories/address/types/make-delete-address-type-use-case';

export async function deleteAddressType(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { addressTypeId } = z
        .object({ addressTypeId: z.string().uuid() })
        .parse(request.params);
    const deleteAddressType = makeDeleteAddressTypeUseCase();

    try {
        await deleteAddressType.execute({
            id: addressTypeId,
        });

        reply.status(204).send();
    } catch (error) {
        reply.status(500).send();
    }
}
