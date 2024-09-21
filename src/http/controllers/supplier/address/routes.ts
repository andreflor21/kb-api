import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middleware/verifyJwt';
import { verifyRouteAccess } from '@/http/middleware/routeAccess';
import {
    getAddressBySupplierId,
    getAddressBySupplierIdSchema,
} from './get-address-by-supplier-id';
import { createAddress, createAddressSchema } from './create-address';
import { deleteAddress, deleteAddressSchema } from './delete-address';
import { updateAddress, updateAddressSchema } from './update-address';
import { getAddressById, getAddressByIdSchema } from './get-address-by-id';
import {
    createAddressType,
    createAddressTypeSchema,
} from './types/create-address-type';
import {
    updateAddressType,
    updateAddressTypeSchema,
} from './types/update-address-type';
import {
    deleteAddressType,
    deleteAddressTypeSchema,
} from './types/delete-address-type';

export async function addressRoutes(app: FastifyInstance) {
    const prefix = '/addresses';
    app.get(
        `/:supplierId${prefix}`,
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: getAddressBySupplierIdSchema,
        },
        getAddressBySupplierId
    );
    app.post(
        `/:supplierId${prefix}/new`,
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: createAddressSchema,
        },
        createAddress
    );
    app.get(
        `/:supplierId${prefix}/:addressId`,
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: getAddressByIdSchema,
        },
        getAddressById
    );
    app.delete(
        `/:supplierId${prefix}/:addressId/delete`,
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: deleteAddressSchema,
        },
        deleteAddress
    );
    app.patch(
        `/:supplierId${prefix}/:addressId/edit`,
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: updateAddressSchema,
        },
        updateAddress
    );

    app.post(
        `${prefix}/types/new`,
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: createAddressTypeSchema,
        },
        createAddressType
    );
    app.patch(
        `${prefix}/types/:addressTypeId/edit`,
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: updateAddressTypeSchema,
        },
        updateAddressType
    );
    app.delete(
        `${prefix}/types/:addressTypeId/delete`,
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: deleteAddressTypeSchema,
        },
        deleteAddressType
    );
}
