import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import { prisma } from '@/lib/prisma';

const verifyRoute = async (
    request: FastifyRequest,
    reply: FastifyReply,
    done: HookHandlerDoneFunction
) => {
    try {
        const userId = request.user?.id; // Assuming you're storing user info on request
        const routePath = request.routerPath; // Get current route

        if (!userId) {
            return reply.status(401).send({ message: 'Unauthorized' });
        }

        // Query user's permissions for the current route
        const hasPermission = await prisma.routes.findFirst({
            join: { user: { profile: { routes: true } } },
        });

        if (!hasPermission) {
            return reply.status(403).send({ message: 'Forbidden' });
        }

        done(); // Continue to the next handler if permission exists
    } catch (error) {
        return reply.status(500).send({ message: 'Internal server error' });
    }
};
