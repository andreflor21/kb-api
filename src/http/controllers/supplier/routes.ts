import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middleware/verifyJwt';
import { listSuppliers, listSuppliersSchema } from './list-suppliers';
import { getSupplierById, getSupplierByIdSchema } from './get-supplier-by-id';
import {
    updateSupplierStatus,
    updateSupplierStatusSchema,
} from './update-supplier-status';
import { addressRoutes } from './address/routes';
import { updateSupplier, updateSupplierSchema } from './update-supplier';
import { createSupplier, createSupplierSchema } from './create-supplier';
import { deleteSupplier, deleteSupplierSchema } from './delete-supplier';
import { verifyRouteAccess } from '@/http/middleware/routeAccess';
import { deliveryDaysRoutes } from './delivery-days/routes';

export async function supplierRoutes(app: FastifyInstance) {
    const prefix = '/suppliers';
    app.get(
        prefix,
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: listSuppliersSchema,
        },
        listSuppliers
    );
    app.post(
        `${prefix}/new`,
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: createSupplierSchema,
        },
        createSupplier
    );
    app.get(
        `${prefix}/:supplierId`,
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: getSupplierByIdSchema,
        },
        getSupplierById
    );
    app.patch(
        `${prefix}/:supplierId/edit`,
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: updateSupplierSchema,
        },
        updateSupplier
    );
    app.delete(
        `${prefix}/:supplierId/delete`,
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: deleteSupplierSchema,
        },
        deleteSupplier
    );
    app.put(
        `${prefix}/:supplierId/status`,
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: updateSupplierStatusSchema,
        },
        updateSupplierStatus
    );
    app.register(addressRoutes, { prefix });
    app.register(deliveryDaysRoutes, { prefix });
}
