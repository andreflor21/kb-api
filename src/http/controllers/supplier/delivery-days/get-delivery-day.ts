import { makeGetDeliveryDaysUseCase } from '@/use-cases/factories/supplier/make-get-delivery-days-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export const getDeliveryDay = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);

    try {
        const getDeliveryDays = makeGetDeliveryDaysUseCase();

        const deliveryDays = await getDeliveryDays.execute({ id });

        return reply.status(200).send(deliveryDays);
    } catch (error) {
        reply.status(500).send();
    }
};
