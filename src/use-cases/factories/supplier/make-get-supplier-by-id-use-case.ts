import { PrismaSupplierRepository } from "@/repositories/prisma/prisma-supplier-repository"
import { GetSupplierByIdUseCase } from "@/use-cases/supplier/get-supplier-by-id"

export function makeGetSupplierByIdUseCase(): GetSupplierByIdUseCase {
	const supplierRepository = new PrismaSupplierRepository()
	const getSupplierByIdUseCase = new GetSupplierByIdUseCase(
		supplierRepository,
	)
	return getSupplierByIdUseCase
}
