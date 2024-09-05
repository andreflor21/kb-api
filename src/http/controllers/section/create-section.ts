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
        ERPcode: z.string().min(3),
        branchMatrixCode: z.string().min(3),
        sectionType: {
            description: z.string().min(3),
            abreviation: z.string().min(3),
        },
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
