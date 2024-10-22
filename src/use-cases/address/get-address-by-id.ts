import type { AddressRepository } from "@/repositories/address-repository"
import { AddressNotFoundError } from "@/shared/errors/address-not-found-error"
import type { SupplierAddress } from "@prisma/client"

interface GetAddressByIdUseCaseResponse {
	address: SupplierAddress | null
}

export class GetAddressByIdUseCase {
	constructor(private addressRepository: AddressRepository) {}

	async execute(id: string): Promise<GetAddressByIdUseCaseResponse> {
		const address = await this.addressRepository.getAddressById(id)
		if (!address) throw new AddressNotFoundError()
		return { address }
	}
}
