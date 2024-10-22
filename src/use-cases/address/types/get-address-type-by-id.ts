import type { AddressTypesRepository } from "@/repositories/address-types-repository"
import type { AddressType } from "@prisma/client"

interface GetAddressTypeByIdResponse {
	addressType: AddressType | null
}
export class GetAddressTypeByIdUseCase {
	constructor(private addressTypesRepository: AddressTypesRepository) {}

	async execute(id: string): Promise<GetAddressTypeByIdResponse> {
		const addressType =
			await this.addressTypesRepository.getAddressTypeById(id)
		return { addressType }
	}
}
