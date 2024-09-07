import { PrismaAddressTypeRepository } from '@/repositories/prisma/prisma-address-type-repository';
import { CreateAddressTypeUseCase } from '@/use-cases/address/types/create-address-type';

export const makeCreateAddressTypeUseCase = (): CreateAddressTypeUseCase => {
    const addressTypeRepository = new PrismaAddressTypeRepository();
    return new CreateAddressTypeUseCase(addressTypeRepository);
};
