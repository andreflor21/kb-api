import { SupplierRepository } from '../supplier-repository';
import { Prisma, SupplierDeliveryDays } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { SupplierAlreadyExistsError } from '@/shared/errors/supplier-already-exists-error';
import { SupplierNotFoundError } from '@/shared/errors/supplier-not-found-error';
import { SupplierExtended } from '@/@Types/SupplierExtended';
import AppError from '@/shared/errors/app-error';

export class PrismaSupplierRepository implements SupplierRepository {
    async createSupplier(
        data: Prisma.SupplierCreateInput
    ): Promise<SupplierExtended> {
        const checkSupplier = await prisma.supplier.findUnique({
            where: { name: data.name.toUpperCase() },
        });
        if (checkSupplier) {
            throw new SupplierAlreadyExistsError();
        }

        return await prisma.supplier.create({
            data,
            include: {
                users: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                addresses: true,
                products: true,
                deliveryDays: true,
            },
        });
    }

    async getSupplierById(id: string): Promise<SupplierExtended> {
        const supplier = await prisma.supplier.findUnique({
            where: { id },
            include: {
                users: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                addresses: true,
                products: true,
                deliveryDays: true,
            },
        });
        if (!supplier) throw new SupplierNotFoundError();
        return supplier;
    }

    async getSuppliers(): Promise<SupplierExtended[]> {
        return await prisma.supplier.findMany({
            include: {
                users: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                addresses: true,
                products: true,
                deliveryDays: true,
            },
        });
    }

    async updateSupplier(
        id: string,
        data: Prisma.SupplierUpdateInput
    ): Promise<SupplierExtended | null> {
        const supplier = await prisma.supplier.update({
            where: { id },
            data,
            include: {
                users: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
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
                users: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
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

    async addDeliveryDays(
        supplierId: string,
        data: Prisma.SupplierDeliveryDaysCreateManyInput[]
    ): Promise<void> {
        const supplier = await prisma.supplier.findUnique({
            where: { id: supplierId },
        });
        if (!supplier) throw new SupplierNotFoundError();

        await prisma.supplierDeliveryDays.createMany({
            data: data.map((item) => ({
                days: item.days,
                period: item.period,
                hour: item.hour,
                supplierId,
            })),
        });
    }

    async updateDeliveryDays(
        supplierId: string,
        data: Prisma.SupplierDeliveryDaysUpdateInput[]
    ): Promise<void> {
        const supplier = await prisma.supplier.findUnique({
            where: { id: supplierId },
        });
        if (!supplier) throw new SupplierNotFoundError();

        data.map(async (item) => {
            const deliveryDays = await prisma.supplierDeliveryDays.findUnique({
                where: { id: item.id as string },
            });
            if (!deliveryDays)
                throw new AppError('Dias para entrega não encontrado', 404);

            await prisma.supplierDeliveryDays.update({
                where: { id: item.id as string },
                data: {
                    days: item.days,
                    period: item.period,
                    hour: item.hour,
                },
            });
        });
    }

    async getDeliveryDaysById(id: string): Promise<SupplierDeliveryDays> {
        const deliveryDay = await prisma.supplierDeliveryDays.findUnique({
            where: { id },
        });
        if (!deliveryDay)
            throw new AppError('Dias para entrega não encontrado', 404);
        return deliveryDay;
    }
    async listDeliveryDays(id: string): Promise<SupplierDeliveryDays[]> {
        const deliveryDays = await prisma.supplierDeliveryDays.findMany({
            where: { supplierId: id },
        });

        return deliveryDays;
    }

    async removeDeliveryDays(id: string): Promise<void> {
        const deliveryDays = await prisma.supplierDeliveryDays.findUnique({
            where: { id },
        });
        if (!deliveryDays)
            throw new AppError('Dias para entrega não encontrado', 404);

        await prisma.supplierDeliveryDays.delete({ where: { id } });
    }

    async importSuppliers(
        data: Prisma.SupplierCreateInput[]
    ): Promise<SupplierExtended[]> {
        const returnData: SupplierExtended[] = [];
        data.forEach(async (supplier) => {
            const out = await prisma.supplier.upsert({
                where: { name: supplier.name as string },
                update: {
                    cnpj: supplier.cnpj as string,
                    name: supplier.name as string,
                    active: supplier.active,
                    legalName: supplier.legalName as string,
                    fone: supplier.fone,
                    email: supplier.email,
                    code: supplier.code,
                    ERPCode: supplier.ERPCode,
                },
                create: {
                    cnpj: (supplier.cnpj as string) ?? null,
                    name: supplier.name as string,
                    active: supplier.active as boolean,
                    legalName: supplier.legalName as string,
                    fone: supplier.fone as string,
                    email: supplier.email as string,
                    code: supplier.code as string,
                    ERPCode: supplier.ERPCode as string,
                },
            });
            returnData.push(out);
        });
        return returnData;
    }
}
