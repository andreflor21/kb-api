import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import path from 'path';
const prisma = new PrismaClient();
async function main() {
    const profile1 = await prisma.profile.upsert({
        where: { description: 'Admin' },
        update: {},
        create: {
            description: 'Admin',
        },
    });
    const profile2 = await prisma.profile.upsert({
        where: { description: 'User' },
        update: {},
        create: {
            description: 'User',
        },
    });
    const user1 = await prisma.user.upsert({
        where: { email: 'kanban@email.com' },
        update: {},
        create: {
            email: 'kanban@email.com',
            name: 'Kanban',
            hashedPassword: await hash('123456', 10),
            profile: {
                connectOrCreate: {
                    where: {
                        description: 'Admin',
                    },
                    create: {
                        description: 'Admin',
                    },
                },
            },
        },
    });
    const user2 = await prisma.user.upsert({
        where: { email: 'bob@prisma.io' },
        update: {},
        create: {
            email: 'bob@prisma.io',
            name: 'Bob',
            hashedPassword: await hash('123456', 10),
            profile: {
                connectOrCreate: {
                    where: {
                        description: 'User',
                    },
                    create: {
                        description: 'User',
                    },
                },
            },
        },
    });
    const section = await prisma.section.upsert({
        where: { description: 'Section 001' },
        update: {},
        create: {
            code: '001',
            description: 'Section 001',
            branchMatrixCode: '001',
            ERPcode: '001',
            sectionType: {
                connectOrCreate: {
                    where: {
                        description: 'Section Type 001',
                    },
                    create: {
                        description: 'Section Type 001',
                    },
                },
            },
        },
    });
    const addressType = await prisma.addressType.upsert({
        where: { description: 'Address Type 001' },
        update: {},
        create: {
            description: 'Address Type 001',
        },
    });
    const supplier = await prisma.supplier.upsert({
        where: { cnpj: '123456789012' },
        update: {},
        create: {
            name: 'Supplier 001',
            cnpj: '123456789012',
            email: 'supplier01@mail.com',
            fone: '12345678901',
            ERPCode: '001',
            code: '001',
            legalName: 'Supplier 001 Ltda',
            addresses: {
                create: {
                    lograd: 'Rua 001',
                    number: '001',
                    district: 'Bairro 001',
                    city: 'Cidade 001',
                    state: 'ES',
                    zipcode: '12345678',
                    addressType: {
                        connect: { id: addressType.id },
                    },
                },
            },
        },
    });
    const productType = await prisma.productType.upsert({
        where: { description: 'Product Type 001' },
        update: {},
        create: {
            description: 'Product Type 001',
        },
    });
    const product = await prisma.product.upsert({
        where: { code: '001' },
        update: {},
        create: {
            code: '001',
            description: 'Product 001',
            conversionFactor: 10,

            buyUnits: {
                connectOrCreate: {
                    where: {
                        abrev: 'CX',
                    },
                    create: {
                        abrev: 'CX',
                        description: 'caixa',
                    },
                },
            },
            stockUnits: {
                connectOrCreate: {
                    where: {
                        abrev: 'UN',
                    },
                    create: {
                        description: 'unidade',
                        abrev: 'UN',
                    },
                },
            },
            productType: {
                connect: { id: productType.id },
            },
        },
    });
    const routes = [
        { path: '/', method: 'POST', description: 'Login' },
        {
            path: '/forgot-password',
            method: 'POST',
            description: 'Forgot Password',
        },
        {
            path: '/reset-password/:token_id',
            method: 'POST',
            description: 'Reset Password',
        },
        { path: '/routes', method: 'GET', description: 'List Routes' },
        {
            path: '/routes/new',
            method: 'POST',
            description: 'Create New Route',
        },
        {
            path: '/routes/:id',
            method: 'GET',
            description: 'Get Route by ID',
        },
        {
            path: '/routes/:id/edit',
            method: 'PATCH',
            description: 'Edit Route by ID',
        },
        { path: '/users', method: 'GET', description: 'List Users' },
        { path: '/users/new', method: 'POST', description: 'Create New User' },
        {
            path: '/users/:id',
            method: 'GET',
            description: 'Get User by ID',
        },
        {
            path: '/users/:id/edit',
            method: 'PATCH',
            description: 'Edit User by ID',
        },
        {
            path: '/users/:id/change-password',
            method: 'PATCH',
            description: 'Change User Password',
        },
        {
            path: '/users/:id/delete',
            method: 'DELETE',
            description: 'Delete User',
        },
        {
            path: '/users/:id/status',
            method: 'PUT',
            description: 'Update User Status',
        },
        {
            path: '/profiles',
            method: 'GET',
            description: 'List Profiles',
        },
        {
            path: '/profiles/duplicate',
            method: 'GET',
            description: 'Duplicate Profile',
        },
        {
            path: '/profiles/new',
            method: 'POST',
            description: 'Create New Profile',
        },
        {
            path: '/profiles/:id',
            method: 'GET',
            description: 'Get Profile by ID',
        },
        {
            path: '/profiles/:id/routes/:routeId/link',
            method: 'POST',
            description: 'Link Route to Profile',
        },
        {
            path: '/profiles/:id/routes/:routeId/unlink',
            method: 'POST',
            description: 'Unlink Route from Profile',
        },
        {
            path: '/sections',
            method: 'GET',
            description: 'List Sections',
        },
        {
            path: '/sections/new',
            method: 'POST',
            description: 'Create New Section',
        },
        {
            path: '/sections/types',
            method: 'GET',
            description: 'List Section Types',
        },
        {
            path: '/sections/types/new',
            method: 'POST',
            description: 'Create New Section Type',
        },
        {
            path: '/sections/types/:id',
            method: 'GET',
            description: 'Get Section Type by ID',
        },
        {
            path: '/sections/types/:id/edit',
            method: 'PATCH',
            description: 'Edit Section Type',
        },
        {
            path: '/sections/types/:id/delete',
            method: 'DELETE',
            description: 'Delete Section Type',
        },
        {
            path: '/sections/:id',
            method: 'GET',
            description: 'Get Section by ID',
        },
        {
            path: '/sections/:id/edit',
            method: 'PATCH',
            description: 'Edit Section',
        },
        {
            path: '/sections/:id/status',
            method: 'PUT',
            description: 'Update Section Status',
        },
        {
            path: '/suppliers',
            method: 'GET',
            description: 'List Suppliers',
        },
        {
            path: '/suppliers/new',
            method: 'GET',
            description: 'Create New Supplier',
        },
        {
            path: '/suppliers/:supplierId',
            method: 'GET',
            description: 'Get Supplier by ID',
        },
        {
            path: '/suppliers/:supplierId/edit',
            method: 'PATCH',
            description: 'Edit Supplier',
        },
        {
            path: '/suppliers/:supplierId/delete',
            method: 'DELETE',
            description: 'Delete Supplier',
        },
        {
            path: '/suppliers/:supplierId/status',
            method: 'PATCH',
            description: 'Update Supplier Status',
        },
        {
            path: '/suppliers/:supplierId/addresses',
            method: 'GET',
            description: 'List Supplier Addresses',
        },
        {
            path: '/suppliers/:supplierId/addresses/new',
            method: 'POST',
            description: 'Create New Address',
        },
        {
            path: '/suppliers/:supplierId/addresses/types/new',
            method: 'POST',
            description: 'Create New Address Type',
        },
        {
            path: '/suppliers/:supplierId/addresses/types/:addressTypeId/edit',
            method: 'PATCH',
            description: 'Edit Address Type',
        },
        {
            path: '/suppliers/:supplierId/addresses/types/:addressTypeId/delete',
            method: 'DELETE',
            description: 'Delete Address Type',
        },
        {
            path: '/suppliers/:supplierId/addresses/:addressId',
            method: 'GET',
            description: 'Get Address by ID',
        },
        {
            path: '/suppliers/:supplierId/addresses/:addressId/delete',
            method: 'DELETE',
            description: 'Delete Address',
        },
        {
            path: '/suppliers/:supplierId/addresses/:addressId/edit',
            method: 'PATCH',
            description: 'Edit Address',
        },
    ];
    for (const route of routes) {
        const r = await prisma.routes.findFirst({
            where: {
                path: route.path,
            },
        });
        if (!r) {
            await prisma.routes.create({
                data: {
                    path: route.path,
                    method: route.method,
                    description: route.description,
                },
            });
        }
    }
    const rts = await prisma.routes.findMany();
    console.log({
        profiles: { profile1, profile2 },
        users: { user1, user2 },
        section,
        addressType,
        supplier,
        productType,
        product,
        routes: rts,
    });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
