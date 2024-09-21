import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeUpdateSectionTypeUseCase } from '@/use-cases/factories/section/types/make-update-section-type-use-case';

export async function updateSectionType(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const updateSectionTypeSchema = z.object({
        description: z.string(),
        abreviation: z.string(),
    });
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);
    const { description, abreviation } = updateSectionTypeSchema.parse(
        request.body
    );

    const updateSectionType = makeUpdateSectionTypeUseCase();

    try {
        const updatedSectionType = await updateSectionType.execute({
            id,
            description,
            abreviation,
        });

        reply.status(204).send();
    } catch (error) {
        reply.status(500).send();
    }
}

export const updateSectionTypeSchema = {
    tags: ['Tipos de Seções'],
    security: [{ BearerAuth: [] }],
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' },
        },
        required: ['id'],
    },
    body: {
        type: 'object',
        properties: {
            description: { type: 'string' },
            abreviation: { type: 'string' },
        },
        required: ['description', 'abreviation'],
    },
    response: {
        204: {
            description: 'Success',
            type: 'null',
        },
        500: {
            description: 'Internal Server Error',
            type: 'null',
        },
        401: {
            description: 'Unauthorized',
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
        403: {
            type: 'object',
            description: 'Forbidden',
            properties: {
                message: { type: 'string' },
            },
        },
    },
};
