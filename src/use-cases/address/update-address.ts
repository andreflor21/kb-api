import { AddressRepository } from '@/repositories/address-repository';
import { SupplierAddress } from '@prisma/client';
import { AddressNotFoundError } from '@/shared/errors/address-not-found-error';

interface UpdateAddressUseCaseRequest {
    id: string;
    lograd: string;
    number: string;
    district: string;
    city: string;
    state: string;
    zipcode: string;
    complement: string | null;
    addressType: {
        description: string;
    };
}

interface UpdateAddressUseCaseResponse {
    address: Partial<SupplierAddress> | null;
}

export class UpdateAddressUseCase {
    constructor(private addressRepository: AddressRepository) {}

    async execute({
        id,
        lograd,
        number,
        district,
        city,
        state,
        zipcode,
        complement,
        addressType,
    }: UpdateAddressUseCaseRequest): Promise<UpdateAddressUseCaseResponse> {
        const address = await this.addressRepository.updateAddress(id, {
            lograd,
            number,
            district,
            city,
            state,
            zipcode,
            complement,
            addressType: {
                connectOrCreate: {
                    where: {
                        description: addressType.description,
                    },
                    create: {
                        description: addressType.description,
                    },
                },
            },
        });
        if (!address) {
            throw new AddressNotFoundError();
        }
        return { address };
    }
}
