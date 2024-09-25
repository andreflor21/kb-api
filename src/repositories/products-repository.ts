import type { ProductExtended } from "@/types/product-extended"
import type { Prisma, Product } from "@prisma/client"

export interface ProductsRepository {
	createProduct(data: Prisma.ProductCreateInput): Promise<ProductExtended>
	getProductById(id: string): Promise<Product | null>
	getProductByCode(code: string): Promise<Product | null>
	getProducts(): Promise<Product[]>
	updateProduct(
		id: string,
		data: Prisma.ProductUpdateInput,
	): Promise<Product | null>
	deleteProduct(id: string): Promise<void>
	importProducts(data: Prisma.ProductCreateInput[]): Promise<Product[]>

	// Adicione outros métodos necessários aqui
}
