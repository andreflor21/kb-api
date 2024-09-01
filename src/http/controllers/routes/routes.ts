import { FastifyInstance } from 'fastify';
import { listRoutes } from './list-routes';
import { createRoute } from './create-route';
import { getRouteById } from './get-route-by-id';
import { updateRoute } from './update-route';
import { verifyJwt } from '@/http/middleware/verifyJwt';

export async function routesRoutes(app: FastifyInstance) {
    app.get('/routes', { onRequest: verifyJwt }, listRoutes);
    app.post('/routes/new', { onRequest: verifyJwt }, createRoute);
    app.get('/routes/:id', { onRequest: verifyJwt }, getRouteById);
    app.patch('/routes/:id/edit', { onRequest: verifyJwt }, updateRoute);
}
