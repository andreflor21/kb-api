import type { ProductsRepository } from "@/repositories/products-repository"
import AppError from "@/shared/errors/app-error"
import type { ProductExtended } from "@/types/product-extended"

type CreateProductRequest = {
	code: string
	description: string
	additionalDescription?: string
	stockUnit: string
	ERPCode?: string
	productType: string
	productGroup?: string
}

type CreateProductResponse = {
	product: ProductExtended
}

export class CreateProductUseCase {
	constructor(private productsRepository: ProductsRepository) {}

	async execute({
		code,
		description,
		additionalDescription,
		stockUnit,
		ERPCode,
		productType,
		productGroup,
	}: CreateProductRequest): Promise<CreateProductResponse> {
		const productWithSameCode =
			await this.productsRepository.getProductByCode(code)
		if (productWithSameCode) {
			throw new AppError("Código já cadastrado", 409)
		}

		const product = await this.productsRepository.createProduct({
			code,
			description,
			additionalDescription,
			stockUnit: {
				connectOrCreate: {
					where: { abrev: stockUnit.toUpperCase() },
					create: { abrev: stockUnit.toUpperCase() },
				},
			},
			ERPCode,
			productType: {
				connectOrCreate: {
					where: { description: productType.toUpperCase() },
					create: { description: productType.toUpperCase() },
				},
			},
			productGroup: productGroup
				? {
						connectOrCreate: {
							where: { description: productGroup.toUpperCase() },
							create: { description: productGroup.toUpperCase() },
						},
					}
				: undefined,
		})
		return { product }
	}
}
