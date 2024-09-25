import type { SupplierRepository } from "@/repositories/supplier-repository"
import AppError from "@/shared/errors/app-error"
import { SupplierNotFoundError } from "@/shared/errors/supplier-not-found-error"
import { validateCpfCnpj } from "@/shared/utils/validate-cpf-cnpj"
import type { SupplierExtended as Supplier } from "@/types/supplier-extended"

type UpdateSupplierUseCaseRequest = {
	id: string
	code: string
	cnpj: string
	name: string
	legalName: string
	ERPCode: string
	fone: string | null
	email: string | null
	users: string[]
}

type UpdateSupplierUseCaseResponse = {
	supplier: Supplier | null
}

export class UpdateSupplierUseCase {
	constructor(private supplierRepository: SupplierRepository) {}

	async execute({
		id,
		code,
		cnpj,
		name,
		legalName,
		ERPCode,
		fone,
		email,
		users,
	}: UpdateSupplierUseCaseRequest): Promise<UpdateSupplierUseCaseResponse> {
		if (cnpj) {
			if (!validateCpfCnpj(cnpj)) {
				throw new AppError("CNPJ inválido", 400)
			}
		}
		const supplier = await this.supplierRepository.updateSupplier(id, {
			code,
			cnpj,
			name,
			legalName,
			ERPCode,
			fone,
			email,
			users: { set: users.map((id) => ({ id })) },
		})
		if (!supplier) throw new SupplierNotFoundError()
		return { supplier }
	}
}
