import type { SupplierExtended as Supplier } from "@/types/supplier-extended"
import type { SupplierRepository } from "@/repositories/supplier-repository"
import AppError from "@/shared/errors/app-error"
import { validateCpfCnpj } from "@/shared/utils/validate-cpf-cnpj"

type CreateSupplierUseCaseRequest = {
	code: string | null
	cnpj: string | null
	name: string
	legalName: string | null
	ERPCode: string | null
	fone: string | null
	email: string | null
	users: string[]
}

type CreateSupplierUseCaseResponse = {
	supplier: Supplier
}

export class CreateSupplierUseCase {
	constructor(private supplierRepository: SupplierRepository) {}

	async execute({
		code,
		cnpj,
		name,
		legalName,
		ERPCode,
		fone,
		email,
		users,
	}: CreateSupplierUseCaseRequest): Promise<CreateSupplierUseCaseResponse> {
		if (cnpj) {
			if (!validateCpfCnpj(cnpj)) {
				throw new AppError("CNPJ inválido", 400)
			}
		}

		const supplier = await this.supplierRepository.createSupplier({
			code,
			cnpj,
			name,
			legalName,
			ERPCode,
			fone,
			email,
			users: { connect: users.map((id) => ({ id })) },
		})
		return { supplier }
	}
}
