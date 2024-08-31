import { FastifyRequest, FastifyReply } from 'fastify';
import { makeListProfileUseCase } from '@/use-cases/factories/profile/make-list-profiles-use-case';

export async function listProfiles(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const listProfiles = makeListProfileUseCase();

    const profiles = await listProfiles.execute();

    reply.status(200).send(profiles);
}
