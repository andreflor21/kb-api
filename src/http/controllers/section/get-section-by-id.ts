import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetSectionByIdUseCase } from '@/use-cases/factories/section/make-get-section-by-id-use-case';

export async function getSectionById(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);

    const getSectionById = makeGetSectionByIdUseCase();

    try {
        const section = await getSectionById.execute({ id });

        reply.status(200).send(section);
    } catch (error) {
        reply.status(500).send();
    }
}
