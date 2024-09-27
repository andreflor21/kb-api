import { prisma } from "@/lib/prisma"
import type { ProductsRepository } from "@/repositories/products-repository"
import type { ProductExtended } from "@/types/product-extended"
import type { Prisma, Product } from "@prisma/client"
export class PrismaProductsRepository implements ProductsRepository {
	async createProduct(
		data: Prisma.ProductCreateInput,
	): Promise<ProductExtended> {
		const product = await prisma.product.create({
			data,
			select: {
				id: true,
				code: true,
				description: true,
				additionalDescription: true,
				active: true,
				createdAt: true,
				stockUnits: true,
				buyUnits: true,
				conversionFactor: true,
				ERPCode: true,
				supplierLeadTimeDays: true,
				stockLeadTimeDays: true,
				suppliers: {
					select: {
						supplier: {
							select: {
								id: true,
								name: true,
							},
						},
						supplierProductCode: true,
						minQty: true,
						buyQty: true,
						leadTime: true,
					},
				},
				productType: {
					select: {
						id: true,
						description: true,
					},
				},
				productGroup: {
					select: {
						id: true,
						description: true,
					},
				},
			},
		})

		// Convert Decimal to number for minQty and buyQty
		const suppliers = product.suppliers.map((supplier) => ({
			...supplier,
			minQty: supplier.minQty ? supplier.minQty.toNumber() : null,
			buyQty: supplier.buyQty ? supplier.buyQty.toNumber() : null,
		}))

		return {
			...product,
			suppliers,
		}
	}

	async getProductById(id: string): Promise<Product | null> {
		return prisma.product.findUnique({ where: { id } })
	}

	async getProductByCode(code: string): Promise<Product | null> {
		return prisma.product.findUnique({ where: { code } })
	}

	async getProducts(): Promise<Product[]> {
		return prisma.product.findMany()
	}

	async updateProduct(
		id: string,
		data: Prisma.ProductUpdateInput,
	): Promise<ProductExtended | null> {
		return prisma.product.update({
			where: { id },
			data,
			select: {
				id: true,
				code: true,
				description: true,
				additionalDescription: true,
				active: true,
				createdAt: true,
				stockUnit: {
					select: {
						id: true,
						description: true,
						abrev: true,
					},
				},
				ERPCode: true,
				suppliers: {
					select: {
						supplier: {
							select: {
								id: true,
								name: true,
							},
						},
						supplierProductCode: true,
						minQty: true,
						buyQty: true,
						leadTime: true,
						stockLeadTime: true,
					},
				},
				productType: {
					select: {
						id: true,
						description: true,
					},
				},
				productGroup: {
					select: {
						id: true,
						description: true,
					},
				},
			},
		})
	}

	async deleteProduct(id: string): Promise<void> {
		await prisma.product.delete({ where: { id } })
	}

	async importProducts(
		data: Prisma.ProductCreateInput[],
	): Promise<Product[]> {
		const dataWithProductTypeId = data.map((product) => ({
			...product,
			productType: { connect: { id: product } }, // Replace "defaultProductTypeId" with an appropriate value or logic
		}))
		return await prisma.product.createMany({ data: dataWithProductTypeId })
	}
}
