import type { ProductsRepository } from "@/repositories/products-repository"
import type { ProductExtended } from "@/types/product-extended"

type ListProductsResponse = {
	products: ProductExtended[]
}

export class ListProductsUseCase {
	constructor(private productsRepository: ProductsRepository) {}

	async execute(): Promise<ListProductsResponse> {
		const products = await this.productsRepository.getProducts()

		return { products }
	}
}
