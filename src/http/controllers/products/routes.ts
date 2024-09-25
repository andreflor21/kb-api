import { FastifyInstance } from 'fastify';
import { createProduct, createProductSchema } from './create-product';
import { verifyJwt } from '@/http/middleware/verifyJwt';
import { verifyRouteAccess } from '@/http/middleware/routeAccess';

export async function productsRoutes(app: FastifyInstance) {
    app.post(
        '/products/new',
        { onRequest: [verifyJwt], schema: createProductSchema },
        createProduct
    );
}
