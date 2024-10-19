import type { ProductExtended } from "@/types/product-extended"
import type { Prisma, Product } from "@prisma/client"

export interface ProductsRepository {
	// create
	createProduct(data: Prisma.ProductCreateInput): Promise<ProductExtended>
	importProducts(data: Prisma.ProductCreateInput[]): Promise<Product[]>

	// read
	getProductById(id: string): Promise<ProductExtended | null>
	getProductByCode(code: string): Promise<ProductExtended | null>
	getProductsBySupplier(supplierId: string): Promise<ProductExtended[]>
	getProducts(): Promise<ProductExtended[]>

	// update
	updateProduct(
		id: string,
		data: Prisma.ProductUpdateInput,
	): Promise<ProductExtended | null>
	updateProductStatus(id: string, status: boolean): Promise<void>

	// delete
	deleteProduct(id: string): Promise<void>

	// Adicione outros métodos necessários aqui

	/*
		DONE: Inclusão Produto
		DONE: Alteração Produto
		DONE: Exclusão Produto
		DONE: Consultar forncedores que entregam o produto
		DONE: Inclusão Tipo Produto
		DONE: Alteração Tipo Produto
		DONE: Exclusão Tipo Produto

	*/
}
