import type { SupplierExtended as Supplier } from "@/types/supplier-extended"
import type { SupplierRepository } from "@/repositories/supplier-repository"

type ListDeliveryDays = {
	supplierId: string
}

type ListDeliveryDaysResponse = {
	supplier: Supplier
}

export class ListDeliveryDaysUseCase {
	constructor(private supplierRepository: SupplierRepository) {}

	async execute({
		supplierId,
	}: ListDeliveryDays): Promise<ListDeliveryDaysResponse> {
		const supplier =
			await this.supplierRepository.listDeliveryDays(supplierId)

		return { supplier }
	}
}
