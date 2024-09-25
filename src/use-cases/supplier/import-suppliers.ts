import type { SupplierRepository } from "@/repositories/supplier-repository"
import type { Supplier } from "@prisma/client"

type ImportSuppliers = {
	suppliers: {
		name: string
		cnpj: string | null
		email: string | null
		fone: string | null
		legalName: string | null
		ERPcode: string | null
		code: string | null
		active: boolean
		createdAt: Date
	}[]
}

type ImportSuppliersResponse = {
	suppliers: Supplier[]
}

export class ImportSuppliersUseCase {
	constructor(private supplierRepository: SupplierRepository) {}

	async execute({
		suppliers,
	}: ImportSuppliers): Promise<ImportSuppliersResponse> {
		const suppliersRet =
			await this.supplierRepository.importSuppliers(suppliers)

		return { suppliers: suppliersRet }
	}
}
