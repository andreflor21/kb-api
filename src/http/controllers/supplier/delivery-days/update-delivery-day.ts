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

export const updateDeliveryDaySchema = {
    tags: ['Fornecedores', 'Dias de entrega'],
    security: [{ BearerAuth: [] }],
    params: {
        type: 'object',
        required: ['id', 'supplierId'],
        properties: {
            id: { type: 'string', format: 'uuid' },
            supplierId: { type: 'string', format: 'uuid' },
        },
    },
    body: {
        type: 'object',
        required: ['days', 'period', 'hour'],
        properties: {
            days: {
                type: 'array',
                items: { type: 'number' },
            },
            period: { type: 'string' },
            hour: { type: 'string' },
        },
    },
    response: {
        200: {
            description: 'Success',
            type: 'object',
            properties: {
                id: { type: 'string' },
                supplierId: { type: 'string' },
                days: {
                    type: 'array',
                    items: { type: 'number' },
                },
                period: { type: 'string' },
                hour: { type: 'string' },
            },
        },
        404: {
            description: 'Not found',
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
        403: {
            description: 'Forbidden',
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
        401: {
            description: 'Unauthorized',
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
        400: {
            description: 'Bad Request',
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
    },
};
