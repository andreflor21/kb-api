import { AddressTypesRepository } from '@/repositories/address-types-repository';
import { AddressType } from '@prisma/client';

interface ListAddressTypesResponse {
    addressTypes: AddressType[];
}
export class ListAddressTypesUseCase {
    constructor(private addressTypesRepository: AddressTypesRepository) {}

    async execute(): Promise<ListAddressTypesResponse> {
        const addressTypes =
            await this.addressTypesRepository.getAddressTypes();
        return { addressTypes };
    }
}
