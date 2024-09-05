import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetSectionTypeByIdUseCase } from '@/use-cases/factories/section/types/make-get-section-type-by-id-use-case';

export async function getSectionTypeById(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);
    console.log(request.params);
    const getSectionTypeById = makeGetSectionTypeByIdUseCase();

    try {
        const sectionType = await getSectionTypeById.execute(id);

        reply.status(200).send(sectionType);
    } catch (error) {
        reply.status(500).send();
    }
}
