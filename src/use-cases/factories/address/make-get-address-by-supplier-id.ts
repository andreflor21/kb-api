import { PrismaAddressRepository } from '@/repositories/prisma/prisma-address-repository';
import { GetAddressBySupplierIdUseCase } from '@/use-cases/address/get-address-by-supplier-id';

export const makeGetAddressBySupplierIdUseCase =
    (): GetAddressBySupplierIdUseCase => {
        const addressRepository = new PrismaAddressRepository();
        return new GetAddressBySupplierIdUseCase(addressRepository);
    };
