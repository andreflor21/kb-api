import type { Prisma, ProductType } from "@prisma/client"

export interface ProductTypeRepository {
	createProductType(data: Prisma.ProductTypeCreateInput): Promise<ProductType>
	getProductTypeById(id: string): Promise<ProductType | null>
	getProductTypes(): Promise<ProductType[]>
	updateProductType(
		id: string,
		data: Prisma.ProductTypeUpdateInput,
	): Promise<ProductType | null>
	deleteProductType(id: string): Promise<void>
}
