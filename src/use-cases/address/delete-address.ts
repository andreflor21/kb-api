import { AddressRepository } from '@/repositories/address-repository';
import { AddressNotFoundError } from '@/shared/errors/address-not-found-error';

interface DeleteAddressUseCaseRequest {
    id: string;
}

export class DeleteAddressUseCase {
    constructor(private addressRepository: AddressRepository) {}

    async execute({ id }: DeleteAddressUseCaseRequest): Promise<void> {
        const address = await this.addressRepository.getAddressById(id);
        if (!address) {
            throw new AddressNotFoundError();
        }
        await this.addressRepository.deleteAddress(id);
    }
}
