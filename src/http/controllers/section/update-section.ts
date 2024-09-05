import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeUpdateSectionUseCase } from '@/use-cases/factories/section/make-update-section-use-case';

export async function updateSection(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const updateSectionSchema = z.object({
        description: z.string().min(3),
        code: z.string().min(3),
        ERPcode: z.string().min(3),
        branchMatrixCode: z.string().min(3),
        sectionType: {
            description: z.string().min(3),
            abreviation: z.string().min(3),
        },
    });
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);
    const { description, code, ERPcode, branchMatrixCode, sectionType } =
        updateSectionSchema.parse(request.body);

    const updateSection = makeUpdateSectionUseCase();

    try {
        const updatedSection = await updateSection.execute({
            id,
            description,
            code,
            ERPcode,
            branchMatrixCode,
            sectionType,
        });

        reply.status(200).send(updatedSection);
    } catch (error) {
        reply.status(500).send();
    }
}
