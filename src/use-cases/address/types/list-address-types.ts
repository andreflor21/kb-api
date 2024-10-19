import type { AddressTypesRepository } from "@/repositories/address-types-repository"
import type { AddressType } from "@prisma/client"

interface ListAddressTypesResponse {
	addressTypes: AddressType[]
}
export class ListAddressTypesUseCase {
	constructor(private addressTypesRepository: AddressTypesRepository) {}

	async execute(): Promise<ListAddressTypesResponse> {
		const addressTypes = await this.addressTypesRepository.getAddressTypes()
		return { addressTypes }
	}
}
