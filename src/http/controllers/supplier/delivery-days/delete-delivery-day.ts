import { makeDeleteDeliveryDayUseCase } from '@/use-cases/factories/supplier/make-delete-delivery-day-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export const deleteDeliveryDay = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const { id, supplierId } = z
        .object({ id: z.string().uuid(), supplierId: z.string().uuid() })
        .parse(request.params);

    try {
        const deleteDeliveryDay = makeDeleteDeliveryDayUseCase();

        await deleteDeliveryDay.execute(id);

        return reply.status(204).send();
    } catch (error) {
        reply.status(500).send();
    }
};
