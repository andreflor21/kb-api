import type { SupplierRepository } from "@/repositories/supplier-repository"

type DeleteSupplierUseCaseRequest = {
	id: string
}
export class DeleteSupplierUseCase {
	constructor(private supplierRepository: SupplierRepository) {}

	async execute({ id }: DeleteSupplierUseCaseRequest): Promise<void> {
		await this.supplierRepository.deleteSupplier(id)
	}
}
