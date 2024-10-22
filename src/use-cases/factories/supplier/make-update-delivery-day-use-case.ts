import { PrismaSupplierRepository } from "@/repositories/prisma/prisma-supplier-repository"
import { UpdateDeliveryDayUseCase } from "@/use-cases/supplier/delivery-days/update-delivery-day"

export function makeUpdateDeliveryDayUseCase(): UpdateDeliveryDayUseCase {
	const supplierRepository = new PrismaSupplierRepository()
	const updateDeliveryDayUseCase = new UpdateDeliveryDayUseCase(
		supplierRepository,
	)
	return updateDeliveryDayUseCase
}
