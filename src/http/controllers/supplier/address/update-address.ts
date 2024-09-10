import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeUpdateAddressUseCase } from '@/use-cases/factories/address/make-update-address-use-case';
import { AddressNotFoundError } from '@/shared/errors/address-not-found-error';

export async function updateAddress(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const updateAddressBodySchema = z.object({
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
    const updateAddressParams = z.object({
        supplierId: z.string().uuid(),
        addressId: z.string().uuid(),
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
    } = updateAddressBodySchema.parse(request.body);
    const { supplierId, addressId } = updateAddressParams.parse(request.params);
    try {
        const updateAddress = makeUpdateAddressUseCase();
        const updatedAddress = await updateAddress.execute({
            id: addressId,
            lograd,
            number,
            zipcode,
            city,
            state,
            district,
            complement: complement ?? null,
            addressType,
        });
        if (!updatedAddress) {
            throw new AddressNotFoundError();
        }
        return reply.status(200).send(updatedAddress);
    } catch (error) {
        if (error instanceof AddressNotFoundError) {
            return reply.status(error.statusCode).send(error.message);
        }
        return reply.status(500).send();
    }
}
