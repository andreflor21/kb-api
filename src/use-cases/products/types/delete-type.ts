import type { ProductTypeRepository } from "@/repositories/product-types-repository"
import AppError from "@/shared/errors/app-error"

export class DeleteProductTypeUseCase {
	constructor(private productTypeRepository: ProductTypeRepository) {}
	async execute(id: string): Promise<void> {
		const productType =
			await this.productTypeRepository.getProductTypeById(id)

		if (!productType) {
			throw new AppError("Tipo de produto não encontrado", 404)
		}

		await this.productTypeRepository.deleteProductType(id)
	}
}
