import { AddressTypesRepository } from '@/repositories/address-types-repository';
import { AddressType } from '@prisma/client';

interface UpdateAddressTypeRequest {
    id: string;
    description: string;
}
interface UpdateAddressTypeResponse {
    addressType: AddressType | null;
}

export class UpdateAddressType {
    constructor(private addressTypesRepository: AddressTypesRepository) {}

    async execute({
        id,
        description,
    }: UpdateAddressTypeRequest): Promise<UpdateAddressTypeResponse> {
        const addressType = await this.addressTypesRepository.updateAddressType(
            id,
            {
                description,
            }
        );
        return { addressType };
    }
}
