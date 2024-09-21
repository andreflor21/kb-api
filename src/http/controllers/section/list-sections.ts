import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeListSectionsUseCase } from '@/use-cases/factories/section/make-list-sections-use-case';

export async function listSections(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const listSections = makeListSectionsUseCase();

    try {
        const sections = await listSections.execute();

        reply.status(200).send(sections);
    } catch (error) {
        reply.status(500).send();
    }
}

export const listSectionsSchema = {
    tags: ['Seções'],
    security: [{ BearerAuth: [] }],
    response: {
        200: {
            description: 'Success',
            type: 'object',
            properties: {
                sections: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            description: { type: 'string' },
                            code: { type: 'string' },
                            ERPcode: { type: 'string' },
                            branchMatrixCode: { type: 'string' },
                            sectionType: {
                                type: 'object',
                                properties: {
                                    description: { type: 'string' },
                                    abreviation: { type: 'string' },
                                },
                            },
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
