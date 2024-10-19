import type { ProductsRepository } from "@/repositories/products-repository"
import AppError from "@/shared/errors/app-error"
import type { ProductExtended } from "@/types/product-extended"

type UpdateProductRequest = {
	id: string
	code: string
	description: string
	additionalDescription?: string
	stockUnit: string
	ERPCode?: string
	productType: string
	productGroup?: string
}

type UpdateProductResponse = {
	product: ProductExtended | null
}

export class UpdateProductUseCase {
	constructor(private productsRepository: ProductsRepository) {}

	async execute({
		id,
		code,
		description,
		additionalDescription,
		stockUnit,
		ERPCode,
		productType,
		productGroup,
	}: UpdateProductRequest): Promise<UpdateProductResponse> {
		const productWithSameCode =
			await this.productsRepository.getProductByCode(code)
		if (productWithSameCode && productWithSameCode.id !== id) {
			throw new AppError("Código do produto já cadastrado", 409)
		}

		const product = await this.productsRepository.updateProduct(id, {
			code,
			description,
			additionalDescription,
			stockUnit: {
				connectOrCreate: {
					where: { abrev: stockUnit },
					create: { abrev: stockUnit },
				},
			},
			ERPCode,
			productType: {
				connectOrCreate: {
					where: { description: productType },
					create: { description: productType },
				},
			},
			productGroup: productGroup
				? {
						connectOrCreate: {
							where: { description: productGroup },
							create: { description: productGroup },
						},
					}
				: undefined,
		})

		return { product }
	}
}
