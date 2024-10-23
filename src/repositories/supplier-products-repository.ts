import type { ProductExtended } from "@/types/product-extended"
import type { Prisma, SupplierProduct } from "@prisma/client"

export interface SupplierProductsRepository {
	createSupplierProduct(
		data: Prisma.SupplierProductCreateInput,
	): Promise<SupplierProduct>
	getSupplierProductById(id: string): Promise<SupplierProduct | null>
	getSupplierProducts(
		supplierId: string,
		skip: number,
		take: number,
	): Promise<SupplierProduct[]>
	updateSupplierProduct(
		id: string,
		data: Prisma.SupplierProductUpdateInput,
	): Promise<SupplierProduct | null>
	deleteSupplierProductStatus(id: string): Promise<void>
	updateSupplierProductStatus(id: string, status: boolean): Promise<void>
	countSupplierProducts(supplierId: string): Promise<number>
}

// DONE: Vincular produto (e adicionar as demais informações para o produto no fornecedor)
// DONE: Alterar informações de vinculo entre produto x fornecedores.
// DONE: Status do vínculo (ativar, inativar) Produto x fornecedor
