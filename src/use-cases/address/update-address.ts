import type { AddressRepository } from "@/repositories/address-repository"
import { AddressNotFoundError } from "@/shared/errors/address-not-found-error"
import type { SupplierAddress } from "@prisma/client"

interface UpdateAddressUseCaseRequest {
	id: string
	lograd: string
	number: string
	district: string
	city: string
	state: string
	zipcode: string
	complement: string | null
	addressType: {
		description: string
	}
}

interface UpdateAddressUseCaseResponse {
	address: Partial<SupplierAddress> | null
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
						description: addressType.description.toUpperCase(),
					},
					create: {
						description: addressType.description.toUpperCase(),
					},
				},
			},
		})
		if (!address) {
			throw new AddressNotFoundError()
		}
		return { address }
	}
}
