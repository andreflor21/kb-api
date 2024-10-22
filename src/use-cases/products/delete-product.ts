import type { ProductsRepository } from "@/repositories/products-repository"
import AppError from "@/shared/errors/app-error"

export class DeleteProductUseCase {
	constructor(private productsRepository: ProductsRepository) {}

	async execute(id: string): Promise<void> {
		const product = await this.productsRepository.getProductById(id)
		if (!product) {
			throw new AppError("Produto não encontrado", 404)
		}

		await this.productsRepository.deleteProduct(id)
	}
}
