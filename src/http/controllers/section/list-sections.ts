import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeListSectionsUseCase } from '@/use-cases/factories/section/make-list-sections-use-case';

export async function listSections(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const listSections = makeListSectionsUseCase();

    try {
        const sections = await listSections.execute();

        reply.status(200).send(sections);
    } catch (error) {
        reply.status(500).send();
    }
}
