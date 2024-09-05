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

        reply.status(200).send(updatedSectionType);
    } catch (error) {
        reply.status(500).send();
    }
}
