import type { AddressRepository } from "@/repositories/address-repository"
import type { SupplierAddress } from "@prisma/client"

interface GetAddressBySupplierIdUseCaseResponse {
	addresses: SupplierAddress[]
}

export class GetAddressBySupplierIdUseCase {
	constructor(private addressRepository: AddressRepository) {}

	async execute(
		supplierId: string,
	): Promise<GetAddressBySupplierIdUseCaseResponse> {
		const addresses =
			await this.addressRepository.getAddressesBySupplierId(supplierId)
		return { addresses }
	}
}
