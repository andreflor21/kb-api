import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middleware/verifyJwt';
import { verifyRouteAccess } from '@/http/middleware/routeAccess';
import { listDeliveryDays } from './list-delivery-days';
import { addDeliveryDay } from './add-delivery-day';
import { getDeliveryDay } from './get-delivery-day';
import { deleteDeliveryDay } from './delete-delivery-day';
import { updateDeliveryDay } from './update-delivery-day';

export async function deliveryDaysRoutes(app: FastifyInstance) {
    const prefix = '/delivery-days';
    app.get(
        `/:supplierId${prefix}`,
        {
            onRequest: [verifyJwt, verifyRouteAccess],
        },
        listDeliveryDays
    );
    app.post(
        `/:supplierId${prefix}/new`,
        {
            onRequest: [verifyJwt, verifyRouteAccess],
        },
        addDeliveryDay
    );
    app.get(
        `/:supplierId${prefix}/:id`,
        {
            onRequest: [verifyJwt, verifyRouteAccess],
        },
        getDeliveryDay
    );
    app.delete(
        `/:supplierId${prefix}/:id/delete`,
        {
            onRequest: [verifyJwt, verifyRouteAccess],
        },
        deleteDeliveryDay
    );

    app.patch(
        `/:supplierId${prefix}/:id/edit`,
        {
            onRequest: [verifyJwt, verifyRouteAccess],
        },
        updateDeliveryDay
    );
}
