import { makeUpdateDeliveryDayUseCase } from '@/use-cases/factories/supplier/make-update-delivery-day-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export const updateDeliveryDay = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const { id, supplierId } = z
        .object({ id: z.string().uuid(), supplierId: z.string().uuid() })
        .parse(request.params);

    const updateDeliveryDayBodySchema = z.object({
        days: z.array(z.number()),
        period: z.string(),
        hour: z.string(),
    });

    const { days, period, hour } = updateDeliveryDayBodySchema.parse(
        request.body
    );

    try {
        const updateDeliveryDay = makeUpdateDeliveryDayUseCase();

        const updatedDeliveryDay = await updateDeliveryDay.execute({
            id,
            days,
            period,
            hour,
            supplierId,
        });

        return reply.status(200).send(updatedDeliveryDay);
    } catch (error) {
        reply.status(500).send();
    }
};
