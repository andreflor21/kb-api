import { FastifyInstance } from 'fastify';
import { listRoutes, listRoutesSchema } from './list-routes';
import { createRoute, createRouteSchema } from './create-route';
import { getRouteById, getRouteByIdSchema } from './get-route-by-id';
import { updateRoute, updateRouteSchema } from './update-route';
import { verifyJwt } from '@/http/middleware/verifyJwt';
import { verifyRouteAccess } from '@/http/middleware/routeAccess';

export async function routesRoutes(app: FastifyInstance) {
    app.get(
        '/routes',
        { onRequest: [verifyJwt, verifyRouteAccess], schema: listRoutesSchema },
        listRoutes
    );
    app.post(
        '/routes/new',
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: createRouteSchema,
        },
        createRoute
    );
    app.get(
        '/routes/:id',
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: getRouteByIdSchema,
        },
        getRouteById
    );
    app.patch(
        '/routes/:id/edit',
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: updateRouteSchema,
        },
        updateRoute
    );
}
