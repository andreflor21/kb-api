import { PrismaSupplierRepository } from "@/repositories/prisma/prisma-supplier-repository"
import { ListDeliveryDaysUseCase } from "@/use-cases/supplier/delivery-days/list-delivery-days"

export function makeListDeliveryDaysUseCase(): ListDeliveryDaysUseCase {
	const supplierRepository = new PrismaSupplierRepository()
	const listDeliveryDaysUseCase = new ListDeliveryDaysUseCase(
		supplierRepository,
	)
	return listDeliveryDaysUseCase
}
