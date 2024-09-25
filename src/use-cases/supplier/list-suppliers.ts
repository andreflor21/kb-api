import type { SupplierExtended as Supplier } from "@/types/supplier-extended"
import type { SupplierRepository } from "@/repositories/supplier-repository"

type ListSuppliersUseCaseResponse = {
	suppliers: Supplier[]
}

export class ListSuppliersUseCase {
	constructor(private supplierRepository: SupplierRepository) {}

	async execute(): Promise<ListSuppliersUseCaseResponse> {
		const suppliers = await this.supplierRepository.getSuppliers()
		return { suppliers }
	}
}
