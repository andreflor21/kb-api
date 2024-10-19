import { PrismaSupplierRepository } from "@/repositories/prisma/prisma-supplier-repository"
import { CreateSupplierUseCase } from "@/use-cases/supplier/create-supplier"

export function makeCreateSupplierUseCase(): CreateSupplierUseCase {
	const supplierRepository = new PrismaSupplierRepository()
	const createSupplierUseCase = new CreateSupplierUseCase(supplierRepository)
	return createSupplierUseCase
}
