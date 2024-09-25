import type { SupplierRepository } from "@/repositories/supplier-repository"
import type { SupplierExtended as Supplier } from "@/types/supplier-extended"

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
