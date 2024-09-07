import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middleware/verifyJwt';
import { getAddressBySupplierId } from './get-address-by-supplier-id';
import { createAddress } from './create-address';
import { deleteAddress } from './delete-address';
import { updateAddress } from './update-address';
import { getAddressById } from './get-address-by-id';
import { createAddressType } from './types/create-address-type';
import { updateAddressType } from './types/update-address-type';
import { deleteAddressType } from './types/delete-address-type';

export async function addressRoutes(app: FastifyInstance) {
    const prefix = '/suppliers/:supplierId/addresses';
    app.get(prefix, { onRequest: verifyJwt }, getAddressBySupplierId);
    app.post(`${prefix}/new`, { onRequest: verifyJwt }, createAddress);
    app.get(`${prefix}/:addressId`, { onRequest: verifyJwt }, getAddressById);
    app.delete(
        `${prefix}/:addressId/delete`,
        { onRequest: verifyJwt },
        deleteAddress
    );
    app.patch(
        `${prefix}/:addressId/edit`,
        { onRequest: verifyJwt },
        updateAddress
    );

    app.post(
        `${prefix}/types/new`,
        { onRequest: verifyJwt },
        createAddressType
    );
    app.patch(
        `${prefix}/types/:addressTypeId/edit`,
        { onRequest: verifyJwt },
        updateAddressType
    );
    app.delete(
        `${prefix}/types/:addressTypeId/delete`,
        { onRequest: verifyJwt },
        deleteAddressType
    );
}
