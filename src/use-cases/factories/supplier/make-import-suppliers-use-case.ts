import { PrismaSupplierRepository } from "@/repositories/prisma/prisma-supplier-repository"
import { ImportSuppliersUseCase } from "@/use-cases/supplier/import-suppliers"

export function makeImportSuppliersUseCase(): ImportSuppliersUseCase {
	const supplierRepository = new PrismaSupplierRepository()
	const importSuppliersUseCase = new ImportSuppliersUseCase(
		supplierRepository,
	)
	return importSuppliersUseCase
}
