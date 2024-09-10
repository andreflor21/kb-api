import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middleware/verifyJwt';
import { listSuppliers } from './list-suppliers';
import { getSupplierById } from './get-supplier-by-id';
import { updateSupplierStatus } from './update-supplier-status';
import { addressRoutes } from './address/routes';
import { updateSupplier } from './update-supplier';
import { createSupplier } from './create-supplier';
import { deleteSupplier } from './delete-supplier';

export async function supplierRoutes(app: FastifyInstance) {
    const prefix = '/suppliers';
    app.get(prefix, { onRequest: verifyJwt }, listSuppliers);
    app.get(`${prefix}/new`, { onRequest: verifyJwt }, createSupplier);
    app.get(`${prefix}/:supplierId`, { onRequest: verifyJwt }, getSupplierById);
    app.patch(
        `${prefix}/:supplierId/edit`,
        { onRequest: verifyJwt },
        updateSupplier
    );
    app.delete(
        `${prefix}/:supplierId/delete`,
        { onRequest: verifyJwt },
        deleteSupplier
    );
    app.patch(
        `${prefix}/:supplierId/status`,
        { onRequest: verifyJwt },
        updateSupplierStatus
    );
    app.register(addressRoutes, { prefix });
}
