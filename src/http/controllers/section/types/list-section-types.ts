import { FastifyRequest, FastifyReply } from 'fastify';
import { makeListSectionTypeUseCase } from '@/use-cases/factories/section/types/make-list-section-type-use-case';

export async function listSectionTypes(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const listSectionType = makeListSectionTypeUseCase();

    try {
        const sectionTypes = await listSectionType.execute();

        reply.status(200).send(sectionTypes);
    } catch (error) {
        reply.status(500).send();
    }
}

export const listSectionTypesSchema = {
    tags: ['Tipos de Seções'],
    security: [{ BearerAuth: [] }],
    response: {
        200: {
            description: 'Success',
            type: 'object',
            properties: {
                sectionTypes: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            description: { type: 'string' },
                            abreviation: { type: 'string' },
                        },
                    },
                },
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
    },
};
