import type { SupplierRepository } from "@/repositories/supplier-repository"
import type { SupplierExtended as Supplier } from "@/types/supplier-extended"

type GetSupplierByIdUseCaseRequest = {
	id: string
}

type GetSupplierByIdUseCaseResponse = {
	supplier: Supplier | null
}

export class GetSupplierByIdUseCase {
	constructor(private supplierRepository: SupplierRepository) {}

	async execute({
		id,
	}: GetSupplierByIdUseCaseRequest): Promise<GetSupplierByIdUseCaseResponse> {
		const supplier = await this.supplierRepository.getSupplierById(id)
		return { supplier }
	}
}
