import { PrismaAddressRepository } from '@/repositories/prisma/prisma-address-repository';
import { UpdateAddressUseCase } from '@/use-cases/address/update-address';

export const makeUpdateAddressUseCase = (): UpdateAddressUseCase => {
    const addressRepository = new PrismaAddressRepository();
    return new UpdateAddressUseCase(addressRepository);
};
