import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ProfileAlreadyExistsError } from '@/shared/errors/profile-already-exists-error';
import { makeLinkProfileToRouteUseCase } from '@/use-cases/factories/profile/make-link-profile-route-use-case';

export async function linkProfileToRoute(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { id, routeId } = z
        .object({
            id: z.string().uuid(),
            routeId: z.string().uuid(),
        })
        .parse(request.params);

    const linkProfileToRoute = makeLinkProfileToRouteUseCase();

    try {
        request.url.endsWith('/link')
            ? await linkProfileToRoute.link({
                  id,
                  routeId,
              })
            : await linkProfileToRoute.unlink({
                  id,
                  routeId,
              });

        reply.status(204).send();
    } catch (error) {
        if (error instanceof ProfileAlreadyExistsError) {
            reply.status(error.statusCode).send({ message: error.message });
        } else {
            reply.status(500).send();
        }
    }
}
