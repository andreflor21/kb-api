import { AddressTypesRepository } from '@/repositories/address-types-repository';
import { AddressType } from '@prisma/client';

interface GetAddressTypeByIdResponse {
    addressType: AddressType | null;
}
export class GetAddressTypeByIdUseCase {
    constructor(private addressTypesRepository: AddressTypesRepository) {}

    async execute(id: string): Promise<GetAddressTypeByIdResponse> {
        const addressType =
            await this.addressTypesRepository.getAddressTypeById(id);
        return { addressType };
    }
}
