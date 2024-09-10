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
