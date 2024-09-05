import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeUpdateSectionStatusUseCase } from '@/use-cases/factories/section/make-update-section-status-use-case';

export async function updateSectionStatus(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const updateSectionStatusSchema = z.object({
        status: z.boolean(),
    });
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);
    const { status } = updateSectionStatusSchema.parse(request.body);

    const updateSectionStatus = makeUpdateSectionStatusUseCase();

    try {
        const updatedSection = await updateSectionStatus.execute({
            id,
            status,
        });

        reply.status(200).send(updatedSection);
    } catch (error) {
        reply.status(500).send();
    }
}
