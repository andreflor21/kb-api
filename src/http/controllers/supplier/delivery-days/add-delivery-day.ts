import { makeAddDeliveryDayUseCase } from '@/use-cases/factories/supplier/make-add-delivery-day-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export const addDeliveryDay = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);

    const addDeliveryDayBodySchema = z.object({
        days: z.array(z.number()),
        period: z.string(),
        hour: z.string(),
    });

    const { days, period, hour } = addDeliveryDayBodySchema.parse(request.body);

    try {
        const addDeliveryDay = makeAddDeliveryDayUseCase();

        const newDeliveryDay = await addDeliveryDay.execute({
            supplierId: id,
            days,
            period,
            hour,
        });

        return reply.status(201).send(newDeliveryDay);
    } catch (error) {
        reply.status(500).send();
    }
};
