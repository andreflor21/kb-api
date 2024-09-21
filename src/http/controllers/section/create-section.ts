import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeCreateSectionUseCase } from '@/use-cases/factories/section/make-create-section-use-case';

export async function createSection(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const createSectionSchema = z.object({
        description: z.string().min(3),
        code: z.string().min(3),
        ERPcode: z.string().min(3).or(z.null()),
        branchMatrixCode: z.string().min(3),
        sectionType: z.object({
            description: z.string().min(3),
            abreviation: z.string(),
        }),
    });

    const { description, code, ERPcode, branchMatrixCode, sectionType } =
        createSectionSchema.parse(request.body);

    const createSection = makeCreateSectionUseCase();

    try {
        const newSection = await createSection.execute({
            description,
            code,
            ERPcode,
            branchMatrixCode,
            sectionType,
        });

        reply.status(201).send(newSection);
    } catch (error) {
        reply.status(500).send();
    }
}

export const createSectionSchema = {
    tags: ['Seções'],
    security: [{ BearerAuth: [] }],
    body: {
        type: 'object',
        properties: {
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
        required: ['description', 'code', 'branchMatrixCode', 'sectionType'],
    },
    response: {
        201: {
            description: 'Success',
            type: 'object',
            properties: {
                section: {
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
            401: {
                type: 'object',
                description: 'Unauthorized',
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
    },
};
