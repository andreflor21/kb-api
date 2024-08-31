import { prisma } from '@/lib/prisma';
import { Prisma, SupplierAddress } from '@prisma/client';

import { AddressRepository } from '../address-repository';

export class PrismaAddressRepository implements AddressRepository {
    async createAddress(
        data: Prisma.SupplierAddressCreateInput
    ): Promise<SupplierAddress> {
        const address = await prisma.supplierAddress.create({ data });
        return address;
    }

    async getAddressById(id: string): Promise<SupplierAddress | null> {
        const address = await prisma.supplierAddress.findUnique({
            where: { id },
        });
        if (!address) return null;

        return address;
    }

    async getAddresses(): Promise<SupplierAddress[]> {
        const addresses = await prisma.supplierAddress.findMany();

        return addresses;
    }

    async getAddressesBySupplierId(
        supplierId: string
    ): Promise<SupplierAddress[] | null> {
        const addresses = await prisma.supplierAddress.findMany({
            where: { supplierId },
        });

        if (!addresses) return null;

        return addresses;
    }

    async updateAddress(
        id: string,
        data: Prisma.SupplierAddressUpdateInput
    ): Promise<SupplierAddress | null> {
        const address = await prisma.supplierAddress.update({
            where: { id },
            data,
        });

        if (!address) return null;

        return address;
    }

    async deleteAddress(id: string): Promise<void> {
        await prisma.supplierAddress.delete({
            where: { id },
        });
    }
}
