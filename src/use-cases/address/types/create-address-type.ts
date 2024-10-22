import type { AddressTypesRepository } from "@/repositories/address-types-repository"
import type { AddressType } from "@prisma/client"

interface CreateAddressTypeRequest {
	description: string
}

interface CreateAddressTypeResponse {
	addressType: AddressType
}
export class CreateAddressTypeUseCase {
	constructor(private addressTypesRepository: AddressTypesRepository) {}

	async execute({
		description,
	}: CreateAddressTypeRequest): Promise<CreateAddressTypeResponse> {
		const addressType = await this.addressTypesRepository.createAddressType(
			{ description },
		)
		return { addressType }
	}
}
