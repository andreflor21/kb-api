import { prisma } from '@/lib/prisma';
import { Prisma, AddressType } from '@prisma/client';
import { AddressTypesRepository } from '../address-types-repository';

export class PrismaAddressTypeRepository implements AddressTypesRepository {
    async createAddressType(
        data: Prisma.AddressTypeCreateInput
    ): Promise<AddressType> {
        const addressType = await prisma.addressType.create({ data });
        return addressType;
    }

    async getAddressTypeById(id: string): Promise<AddressType | null> {
        const addressType = await prisma.addressType.findUnique({
            where: { id },
        });
        if (!addressType) return null;

        return addressType;
    }

    async getAddressTypes(): Promise<AddressType[]> {
        const addressTypes = await prisma.addressType.findMany();

        return addressTypes;
    }

    async updateAddressType(
        id: string,
        data: Prisma.AddressTypeUpdateInput
    ): Promise<AddressType | null> {
        const addressType = await prisma.addressType.update({
            where: { id },
            data,
        });

        if (!addressType) return null;

        return addressType;
    }

    async deleteAddressType(id: string): Promise<void> {
        await prisma.addressType.delete({
            where: { id },
        });
    }
}
