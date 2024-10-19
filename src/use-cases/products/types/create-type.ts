import type { ProductTypeRepository } from "@/repositories/product-types-repository"
import AppError from "@/shared/errors/app-error"
import type { ProductType } from "@prisma/client"

type createProductTypeResponse = {
	productType: ProductType
}
export class CreateProductTypeUseCase {
	constructor(private productTypeRepository: ProductTypeRepository) {}

	async execute(description: string): Promise<createProductTypeResponse> {
		const productType =
			await this.productTypeRepository.getProductTypeByDescription(
				description,
			)
		if (productType) {
			throw new AppError("Tipo de Produto já cadastrado", 409)
		}

		const newProductType =
			await this.productTypeRepository.createProductType({ description })
		return { productType: newProductType }
	}
}
