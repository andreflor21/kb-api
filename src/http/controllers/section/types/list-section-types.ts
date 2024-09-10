import { FastifyRequest, FastifyReply } from 'fastify';
import { makeListSectionTypeUseCase } from '@/use-cases/factories/section/types/make-list-section-type-use-case';

export async function listSectionTypes(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const listSectionType = makeListSectionTypeUseCase();

    try {
        const sectionTypes = await listSectionType.execute();

        reply.status(200).send(sectionTypes);
    } catch (error) {
        reply.status(500).send();
    }
}
