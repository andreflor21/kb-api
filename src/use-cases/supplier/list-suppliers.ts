import type { SupplierRepository } from "@/repositories/supplier-repository"
import type { SupplierExtended as Supplier } from "@/types/supplier-extended"

type ListSuppliersUseCaseRequest = {
	skip: number
	take: number
}

type ListSuppliersUseCaseResponse = {
	suppliers: Supplier[]
	totalSuppliers: number
}

export class ListSuppliersUseCase {
	constructor(private supplierRepository: SupplierRepository) {}

	async execute({
		skip,
		take,
	}: ListSuppliersUseCaseRequest): Promise<ListSuppliersUseCaseResponse> {
		const suppliers = await this.supplierRepository.getSuppliers(skip, take)
		const totalSuppliers = await this.supplierRepository.countSuppliers()
		return { suppliers, totalSuppliers }
	}
}
