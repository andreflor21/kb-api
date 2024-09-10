import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeDeleteSectionTypeUseCase } from '@/use-cases/factories/section/types/make-delete-section-type-use-case';

export async function deleteSectionType(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);

    const deleteSectionType = makeDeleteSectionTypeUseCase();

    try {
        await deleteSectionType.execute(id);

        reply.status(204).send();
    } catch (error) {
        reply.status(500).send();
    }
}
