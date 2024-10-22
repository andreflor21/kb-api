import type { SupplierRepository } from "@/repositories/supplier-repository"

export class DeleteDeliveryDayUseCase {
	constructor(private supplierRepository: SupplierRepository) {}

	async execute(id: string): Promise<void> {
		await this.supplierRepository.removeDeliveryDays(id)
	}
}
