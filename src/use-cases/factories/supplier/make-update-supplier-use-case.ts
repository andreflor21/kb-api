import { PrismaSupplierRepository } from "@/repositories/prisma/prisma-supplier-repository"
import { UpdateSupplierUseCase } from "@/use-cases/supplier/update-supplier"

export function makeUpdateSupplierUseCase(): UpdateSupplierUseCase {
	const supplierRepository = new PrismaSupplierRepository()
	const updateSupplierUseCase = new UpdateSupplierUseCase(supplierRepository)
	return updateSupplierUseCase
}
