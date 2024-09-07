import { PrismaAddressTypeRepository } from '@/repositories/prisma/prisma-address-type-repository';
import { GetAddressTypeByIdUseCase } from '@/use-cases/address/types/get-address-type-by-id';

export const makeGetAddressTypeByIdUseCase = (): GetAddressTypeByIdUseCase => {
    const addressTypeRepository = new PrismaAddressTypeRepository();
    return new GetAddressTypeByIdUseCase(addressTypeRepository);
};
