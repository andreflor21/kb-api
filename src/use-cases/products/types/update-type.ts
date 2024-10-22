import type { ProductTypeRepository } from "@/repositories/product-types-repository"
import AppError from "@/shared/errors/app-error"
import type { ProductType } from "@prisma/client"

type UpdateTypeRequest = {
	id: string
	description: string
}
type UpdateTypeResponse = {
	productType: ProductType | null
}

export class UpdateTypeUseCase {
	constructor(private productTypeRepository: ProductTypeRepository) {}

	async execute(data: UpdateTypeRequest): Promise<UpdateTypeResponse> {
		const typeCheck = await this.productTypeRepository.getProductTypeById(
			data.id,
		)
		if (!typeCheck) {
			throw new AppError("Tipo de produto não encontrado", 404)
		}
		const productType = await this.productTypeRepository.updateProductType(
			data.id,
			data,
		)
		return { productType }
	}
}
