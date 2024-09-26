import { ProductsRepository } from "@/repositories/products-repository"
import AppError from "@/shared/errors/app-error"
import type { ProductExtended } from "@/types/product-extended"

type UpdateProductRequest = {
	id: string
	code: string
	description: string
	additionalDescription?: string
	stockUnit: string
	buyUnit: string
	conversionFactor: number
	ERPCode?: string
	supplierLeadTimeDays?: number
	stockLeadTimeDays?: number
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
		buyUnit,
		conversionFactor,
		ERPCode,
		supplierLeadTimeDays,
		stockLeadTimeDays,
		productType,
		productGroup,
	}: UpdateProductRequest): Promise<UpdateProductResponse> {
		const productWithSameCode =
			await this.productsRepository.getProductById(id)
		if (!productWithSameCode) {
			throw new AppError("Produto não encontrado", 404)
		}

		const product = await this.productsRepository.updateProduct(id, {
			code,
			description,
			additionalDescription,
			stockUnits: {
				connectOrCreate: {
					where: { abrev: stockUnit },
					create: { abrev: stockUnit },
				},
			},
			buyUnits: {
				connectOrCreate: {
					where: { abrev: buyUnit },
					create: { abrev: buyUnit },
				},
			},
			conversionFactor,
			ERPCode,
			supplierLeadTimeDays,
			stockLeadTimeDays,
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
