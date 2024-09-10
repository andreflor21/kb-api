import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetAddressByIdUseCase } from '@/use-cases/factories/address/make-get-address-by-id';

export async function getAddressById(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const getAddressByIdParams = z.object({
        id: z.string().uuid(),
    });
    const { id } = getAddressByIdParams.parse(request.params);

    const getAddressById = makeGetAddressByIdUseCase();

    try {
        const address = await getAddressById.execute(id);
        return reply.status(200).send(address);
    } catch (error) {
        return reply.status(500).send();
    }
}
