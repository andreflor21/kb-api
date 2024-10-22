import type { ProductsRepository } from "@/repositories/products-repository"
import AppError from "@/shared/errors/app-error"
import type { ProductExtended } from "@/types/product-extended"

type getProductByCodeRequest = {
	code: string
}
type getProductByCodeResponse = {
	product: ProductExtended
}

export class GetProductByCodeUseCase {
	constructor(private productsRepository: ProductsRepository) {}

	async execute({
		code,
	}: getProductByCodeRequest): Promise<getProductByCodeResponse> {
		const product = await this.productsRepository.getProductById(code)

		if (!product) {
			throw new AppError("Produto não encontrado", 404)
		}

		return { product }
	}
}
