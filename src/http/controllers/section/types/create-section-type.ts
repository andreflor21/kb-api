import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeCreateSectionTypeUseCase } from '@/use-cases/factories/section/types/make-create-section-type-use-case';

export async function createSectionType(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const createSectionTypeSchema = z.object({
        description: z.string(),
        abreviation: z.string(),
    });
    const { description, abreviation } = createSectionTypeSchema.parse(
        request.body
    );

    const createSectionType = makeCreateSectionTypeUseCase();

    try {
        const sectionType = await createSectionType.execute({
            description,
            abreviation,
        });

        reply.status(201).send(sectionType);
    } catch (error) {
        reply.status(500).send();
    }
}

export const createSectionTypeSchema = {
    tags: ['Tipos de Seções'],
    security: [{ BearerAuth: [] }],
    body: {
        type: 'object',
        properties: {
            description: { type: 'string' },
            abreviation: { type: 'string' },
        },
        required: ['description', 'abreviation'],
    },
    response: {
        201: {
            description: 'Success',
            type: 'object',
            properties: {
                id: { type: 'string' },
                description: { type: 'string' },
                abreviation: { type: 'string' },
            },
        },
        403: {
            type: 'object',
            description: 'Forbidden',
            properties: {
                message: { type: 'string' },
            },
        },
        401: {
            type: 'object',
            description: 'Unauthorized',
            properties: {
                message: { type: 'string' },
            },
        },
        500: {
            type: 'object',
            description: 'Internal Server Error',
            properties: {
                message: { type: 'string' },
            },
        },
    },
};
