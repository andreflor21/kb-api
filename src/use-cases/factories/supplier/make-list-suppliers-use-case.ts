import { PrismaSupplierRepository } from "@/repositories/prisma/prisma-supplier-repository"
import { ListSuppliersUseCase } from "@/use-cases/supplier/list-suppliers"

export function makeListSuppliersUseCase(): ListSuppliersUseCase {
	const supplierRepository = new PrismaSupplierRepository()
	const listSuppliersUseCase = new ListSuppliersUseCase(supplierRepository)
	return listSuppliersUseCase
}
