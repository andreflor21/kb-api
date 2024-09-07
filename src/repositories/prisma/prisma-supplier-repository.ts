import { SupplierRepository } from '../supplier-repository';
import { Supplier } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { SupplierAlreadyExistsError } from '@/shared/errors/supplier-already-exists-error';
import { SupplierNotFoundError } from '@/shared/errors/supplier-not-found-error';
import { SupplierExtended } from '@/@Types/SupplierExtended';

export class PrismaSupplierRepository implements SupplierRepository {
    async createSupplier(data: Supplier): Promise<SupplierExtended> {
        const checkSupplier = await prisma.supplier.findUnique({
            where: { cnpj: data.cnpj },
        });
        if (checkSupplier) {
            throw new SupplierAlreadyExistsError();
        }
        return await prisma.supplier.create({
            data,
            include: {
                addresses: {
                    select: {
                        id: true,
                        addressTypeId: true,
                    },
                },
            },
        });
    }

    async getSupplierById(id: string): Promise<SupplierExtended | null> {
        const supplier = await prisma.supplier.findUnique({
            where: { id },
            include: {
                addresses: {
                    select: {
                        id: true,
                        addressTypeId: true,
                    },
                },
            },
        });
        if (!supplier) throw new SupplierNotFoundError();
        return supplier;
    }

    async getSuppliers(): Promise<SupplierExtended[]> {
        return await prisma.supplier.findMany({
            include: {
                addresses: {
                    select: {
                        id: true,
                        addressTypeId: true,
                    },
                },
            },
        });
    }

    async updateSupplier(data: Supplier): Promise<SupplierExtended | null> {
        const supplier = await prisma.supplier.update({
            where: { id: data.id },
            data,
            include: {
                addresses: {
                    select: {
                        id: true,
                        addressTypeId: true,
                    },
                },
            },
        });
        if (!supplier) throw new SupplierNotFoundError();
        return supplier;
    }

    async updateSupplierStatus(
        id: string,
        status: boolean
    ): Promise<SupplierExtended> {
        const supplier = await prisma.supplier.update({
            where: { id },
            data: { active: status },
            include: {
                addresses: {
                    select: {
                        id: true,
                        addressTypeId: true,
                    },
                },
            },
        });
        if (!supplier) throw new SupplierNotFoundError();
        return supplier;
    }

    async deleteSupplier(id: string): Promise<void> {
        await prisma.supplier.delete({ where: { id } });
    }
}
