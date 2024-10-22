import type { ProductsRepository } from "@/repositories/products-repository"
import AppError from "@/shared/errors/app-error"
import type { ProductExtended } from "@/types/product-extended"

type getProductByIdRequest = {
	id: string
}
type getProductByIdResponse = {
	product: ProductExtended
}

export class GetProductByIdUseCase {
	constructor(private productsRepository: ProductsRepository) {}

	async execute({
		id,
	}: getProductByIdRequest): Promise<getProductByIdResponse> {
		const product = await this.productsRepository.getProductById(id)

		if (!product) {
			throw new AppError("Produto não encontrado", 404)
		}

		return { product }
	}
}
