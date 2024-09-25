import type { SupplierExtended as Supplier } from "@/types/supplier-extended"
import type { SupplierRepository } from "@/repositories/supplier-repository"

type UpdateSupplierStatusUseCaseRequest = {
	id: string
	status: boolean
}

type UpdateSupplierStatusUseCaseResponse = {
	supplier: Supplier
}

export class UpdateSupplierStatusUseCase {
	constructor(private supplierRepository: SupplierRepository) {}

	async execute({
		id,
		status,
	}: UpdateSupplierStatusUseCaseRequest): Promise<UpdateSupplierStatusUseCaseResponse> {
		const supplier = await this.supplierRepository.updateSupplierStatus(
			id,
			status,
		)
		return { supplier }
	}
}
