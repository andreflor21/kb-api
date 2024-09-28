import type { ProductsRepository } from "@/repositories/products-repository"
import type { ProductExtended } from "@/types/product-extended"

type ListProductsBySupplierIdRequest = {
	supplierId: string
}
type ListProductsBySupplierIdResponse = {
	products: ProductExtended[]
}

export class ListProductsBySupplierIdUseCase {
	constructor(private productsRepository: ProductsRepository) {}

	async execute({
		supplierId,
	}: ListProductsBySupplierIdRequest): Promise<ListProductsBySupplierIdResponse> {
		const products =
			await this.productsRepository.getProductsBySupplier(supplierId)

		return { products }
	}
}
