import type { ProductsRepository } from "@/repositories/products-repository"
import type { ProductExtended } from "@/types/product-extended"

type ListProductsRequest = {
	skip: number
	take: number
}
type ListProductsResponse = {
	products: ProductExtended[]
	totalProducts: number
}

export class ListProductsUseCase {
	constructor(private productsRepository: ProductsRepository) {}

	async execute({
		skip,
		take,
	}: ListProductsRequest): Promise<ListProductsResponse> {
		const products = await this.productsRepository.getProducts(skip, take)
		const totalProducts = await this.productsRepository.countProducts()
		return { products, totalProducts }
	}
}
