import { PrismaAddressTypeRepository } from '@/repositories/prisma/prisma-address-type-repository';
import { UpdateAddressTypeUseCase } from '@/use-cases/address/types/update-address-type';

export const makeUpdateAddressTypeUseCase = (): UpdateAddressTypeUseCase => {
    const addressTypeRepository = new PrismaAddressTypeRepository();
    return new UpdateAddressTypeUseCase(addressTypeRepository);
};
