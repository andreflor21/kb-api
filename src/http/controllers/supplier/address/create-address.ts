import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeCreateAddressUseCase } from '@/use-cases/factories/address/make-create-address-use-case';

export async function createAddress(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const createAddressBodySchema = z.object({
        lograd: z.string().max(100),
        number: z.string().max(20),
        zipcode: z.string().max(9),
        city: z.string().max(100),
        state: z.string().max(2),
        district: z.string().max(100),
        complement: z.string().or(z.null()).optional(),
        addressType: z.object({
            description: z.string().max(100),
        }),
    });
    const createAddressParams = z.object({
        supplierId: z.string().uuid(),
    });

    const {
        lograd,
        number,
        zipcode,
        city,
        state,
        district,
        complement,
        addressType,
    } = createAddressBodySchema.parse(request.body);
    const { supplierId } = createAddressParams.parse(request.params);

    try {
        const createAddress = makeCreateAddressUseCase();
        const newAddress = await createAddress.execute({
            lograd,
            number,
            zipcode,
            city,
            state,
            district,
            complement: complement ?? null,
            addressType,
            supplierId,
        });

        return reply.status(201).send(newAddress);
    } catch (error) {
        reply.status(500).send();
    }
}
