import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeUpdateAddressTypeUseCase } from '@/use-cases/factories/address/types/make-update-address-type-use-case';

export async function updateAddressType(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const createAddressTypeSchema = z.object({
        description: z.string().max(100),
    });

    const { description } = createAddressTypeSchema.parse(request.body);
    const { addressTypeId } = z
        .object({ addressTypeId: z.string().uuid() })
        .parse(request.params);
    const updateAddressType = makeUpdateAddressTypeUseCase();

    try {
        const addressType = await updateAddressType.execute({
            id: addressTypeId,
            description,
        });

        reply.status(201).send(addressType);
    } catch (error) {
        reply.status(500).send();
    }
}
