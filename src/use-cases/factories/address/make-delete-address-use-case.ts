import { PrismaAddressRepository } from '@/repositories/prisma/prisma-address-repository';
import { DeleteAddressUseCase } from '@/use-cases/address/delete-address';

export const makeDeleteAddressUseCase = (): DeleteAddressUseCase => {
    const addressRepository = new PrismaAddressRepository();
    return new DeleteAddressUseCase(addressRepository);
};
