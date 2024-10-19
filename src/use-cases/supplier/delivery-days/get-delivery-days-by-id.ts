import type { SupplierRepository } from "@/repositories/supplier-repository"
import type { SupplierDeliveryDays } from "@prisma/client"

type GetDeliveryDays = {
	id: string
}

type GetDeliveryDaysResponse = {
	deliveryDay: SupplierDeliveryDays
}

export class GetDeliveryDaysUseCase {
	constructor(private supplierRepository: SupplierRepository) {}

	async execute({ id }: GetDeliveryDays): Promise<GetDeliveryDaysResponse> {
		const deliveryDay =
			await this.supplierRepository.getDeliveryDaysById(id)

		return { deliveryDay }
	}
}
