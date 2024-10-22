import { PrismaSupplierRepository } from "@/repositories/prisma/prisma-supplier-repository"
import { DeleteDeliveryDayUseCase } from "@/use-cases/supplier/delivery-days/delete-delivery-day"

export function makeDeleteDeliveryDayUseCase(): DeleteDeliveryDayUseCase {
	const supplierRepository = new PrismaSupplierRepository()
	const deleteDeliveryDayUseCase = new DeleteDeliveryDayUseCase(
		supplierRepository,
	)
	return deleteDeliveryDayUseCase
}
