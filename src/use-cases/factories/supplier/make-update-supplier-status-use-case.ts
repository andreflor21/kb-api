import { PrismaSupplierRepository } from "@/repositories/prisma/prisma-supplier-repository"
import { UpdateSupplierStatusUseCase } from "@/use-cases/supplier/update-supplier-status"

export function makeUpdateSupplierStatusUseCase(): UpdateSupplierStatusUseCase {
	const supplierRepository = new PrismaSupplierRepository()
	const updateSupplierStatusUseCase = new UpdateSupplierStatusUseCase(
		supplierRepository,
	)
	return updateSupplierStatusUseCase
}
