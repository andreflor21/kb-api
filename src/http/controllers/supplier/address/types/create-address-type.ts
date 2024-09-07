import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeCreateAddressTypeUseCase } from '@/use-cases/factories/address/types/make-create-address-type-use-case';

export async function createAddressType(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const createAddressTypeSchema = z.object({
        description: z.string().max(100),
    });

    const { description } = createAddressTypeSchema.parse(request.body);

    const createAddressType = makeCreateAddressTypeUseCase();

    try {
        const newAddressType = await createAddressType.execute({
            description,
        });

        reply.status(201).send(newAddressType);
    } catch (error) {
        reply.status(500).send();
    }
}
