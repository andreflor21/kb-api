import type { Prisma, ProductGroup } from "@prisma/client"

export interface ProductGroupsRepository {
	createProductGroup(
		data: Prisma.ProductGroupCreateInput,
	): Promise<ProductGroup>
	getProductGroupById(id: string): Promise<ProductGroup | null>
	getProductGroups(): Promise<ProductGroup[]>
	updateProductGroup(
		id: string,
		data: Prisma.ProductGroupUpdateInput,
	): Promise<ProductGroup | null>
	deleteProductGroup(id: string): Promise<void>
}
