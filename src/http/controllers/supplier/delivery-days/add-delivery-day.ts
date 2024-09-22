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

export const addDeliveryDaySchema = {
    tags: ['Fornecedores', 'Dias de entrega'],
    security: [{ BearerAuth: [] }],
    params: {
        type: 'object',
        required: ['supplierId'],
        properties: {
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
        201: {
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
        400: {
            description: 'Bad Request',
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
        403: {
            description: 'Forbidden',
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
        500: {
            description: 'Internal Server Error',
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
    },
};
