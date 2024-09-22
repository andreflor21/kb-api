import { makeListDeliveryDaysUseCase } from '@/use-cases/factories/supplier/make-list-delivery-days-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export const listDeliveryDays = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const { supplierId } = z
        .object({ supplierId: z.string().uuid() })
        .parse(request.params);

    try {
        const listDeliveryDays = makeListDeliveryDaysUseCase();

        const deliveryDays = await listDeliveryDays.execute({ supplierId });

        return reply.status(200).send(deliveryDays);
    } catch (error) {
        reply.status(500).send();
    }
};
