import type { AddressRepository } from "@/repositories/address-repository"
import type { SupplierAddress } from "@prisma/client"

interface CreateAddressUseCaseRequest {
	lograd: string
	number: string
	district: string
	city: string
	state: string
	zipcode: string
	complement: string | null
	supplierId: string
	addressType: {
		description: string
	}
}

interface CreateAddressUseCaseResponse {
	address: Partial<SupplierAddress>
}

export class CreateAddressUseCase {
	constructor(private addressRepository: AddressRepository) {}

	async execute({
		lograd,
		number,
		district,
		city,
		state,
		zipcode,
		complement,
		supplierId,
		addressType,
	}: CreateAddressUseCaseRequest): Promise<CreateAddressUseCaseResponse> {
		const address = await this.addressRepository.createAddress({
			lograd,
			number,
			district,
			city,
			state,
			zipcode,
			complement,
			supplier: {
				connect: {
					id: supplierId,
				},
			},
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
		})
		return { address }
	}
}
