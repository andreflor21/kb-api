import { AddressTypesRepository } from '@/repositories/address-types-repository';
import { AddressType } from '@prisma/client';

interface DeleteAddressTypeRequest {
    id: string;
}

export class DeleteAddressTypeUseCase {
    constructor(private addressTypesRepository: AddressTypesRepository) {}

    async execute({ id }: DeleteAddressTypeRequest): Promise<void> {
        await this.addressTypesRepository.deleteAddressType(id);
    }
}
