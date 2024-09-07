import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
const prisma = new PrismaClient();
async function main() {
    const admin = await prisma.profile.upsert({
        where: { description: 'Admin' },
        update: {},
        create: {
            description: 'Admin',
        },
    });
    const user = await prisma.profile.upsert({
        where: { description: 'User' },
        update: {},
        create: {
            description: 'User',
        },
    });

    const kanban = await prisma.user.upsert({
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
    const bob = await prisma.user.upsert({
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
    const supplier = await prisma.supplier.create({
        data: {
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
    console.log({ admin, user, kanban, bob, section, addressType, supplier });
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
