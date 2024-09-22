import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middleware/verifyJwt';
import { verifyRouteAccess } from '@/http/middleware/routeAccess';
import { listDeliveryDays, listDeliveryDaysSchema } from './list-delivery-days';
import { addDeliveryDay, addDeliveryDaySchema } from './add-delivery-day';
import { getDeliveryDay, getDeliveryDaySchema } from './get-delivery-day';
import {
    deleteDeliveryDay,
    deleteDeliveryDaySchema,
} from './delete-delivery-day';
import {
    updateDeliveryDay,
    updateDeliveryDaySchema,
} from './update-delivery-day';

export async function deliveryDaysRoutes(app: FastifyInstance) {
    const prefix = '/delivery-days';
    app.get(
        `/:supplierId${prefix}`,
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: listDeliveryDaysSchema,
        },
        listDeliveryDays
    );
    app.post(
        `/:supplierId${prefix}/new`,
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: addDeliveryDaySchema,
        },
        addDeliveryDay
    );
    app.get(
        `/:supplierId${prefix}/:id`,
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: getDeliveryDaySchema,
        },
        getDeliveryDay
    );
    app.delete(
        `/:supplierId${prefix}/:id/delete`,
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: deleteDeliveryDaySchema,
        },
        deleteDeliveryDay
    );

    app.patch(
        `/:supplierId${prefix}/:id/edit`,
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: updateDeliveryDaySchema,
        },
        updateDeliveryDay
    );
}
