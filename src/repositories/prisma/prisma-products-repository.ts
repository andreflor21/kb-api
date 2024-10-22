import { prisma } from "@/lib/prisma"
import type { ProductsRepository } from "@/repositories/products-repository"
import type { ProductExtended } from "@/types/product-extended"
import type { Prisma, Product } from "@prisma/client"
export class PrismaProductsRepository implements ProductsRepository {
	private selectFields = {
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
				buyUnit: {
					select: {
						id: true,
						description: true,
						abrev: true,
					},
				},
				active: true,
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
	}

	async createProduct(
		data: Prisma.ProductCreateInput,
	): Promise<ProductExtended> {
		const product = await prisma.product.create({
			data,
			select: this.selectFields,
		})
		return product
	}

	async importProducts(
		data: Prisma.ProductCreateInput[],
	): Promise<Product[]> {
		const ret = []
		for (const product of data) {
			const result = await prisma.product.upsert({
				where: { code: product.code },
				update: {
					...product,
					stockUnit: {
						connectOrCreate: {
							where: {
								abrev: (
									product.stockUnit as string
								).toUpperCase(),
							},
							create: {
								abrev: (
									product.stockUnit as string
								).toUpperCase(),
							},
						},
					},
					productType: {
						connectOrCreate: {
							where: {
								description: (
									product.productType as string
								).toUpperCase(),
							},
							create: {
								description: (
									product.productType as string
								).toUpperCase(),
							},
						},
					},
					productGroup: product.productGroup
						? {
								connectOrCreate: {
									where: {
										description: (
											product.productGroup as string
										).toUpperCase(),
									},
									create: {
										description: (
											product.productGroup as string
										).toUpperCase(),
									},
								},
							}
						: undefined,
				},
				create: {
					...product,
					stockUnit: {
						connectOrCreate: {
							where: {
								abrev: (
									product.stockUnit as string
								).toUpperCase(),
							},
							create: {
								abrev: (
									product.stockUnit as string
								).toUpperCase(),
							},
						},
					},
					productType: {
						connectOrCreate: {
							where: {
								description: (
									product.productType as string
								).toUpperCase(),
							},
							create: {
								description: (
									product.productType as string
								).toUpperCase(),
							},
						},
					},
					productGroup: product.productGroup
						? {
								connectOrCreate: {
									where: {
										description: (
											product.productGroup as string
										).toUpperCase(),
									},
									create: {
										description: (
											product.productGroup as string
										).toUpperCase(),
									},
								},
							}
						: undefined,
				},
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
					productTypeId: true,
					stockUnitId: true,
					productGroupId: true,
				},
			})
			ret.push(result)
		}
		return ret
	}

	async getProductById(id: string): Promise<ProductExtended | null> {
		return prisma.product.findUnique({
			where: { id },
			select: this.selectFields,
		})
	}

	async getProductByCode(code: string): Promise<ProductExtended | null> {
		return prisma.product.findUnique({
			where: { code },
			select: this.selectFields,
		})
	}

	async getProducts(): Promise<ProductExtended[]> {
		return prisma.product.findMany({
			select: this.selectFields,
		})
	}

	async getProductsBySupplier(
		supplierId: string,
	): Promise<ProductExtended[]> {
		return prisma.product.findMany({
			where: {
				suppliers: {
					every: {
						supplierId,
					},
				},
			},
			select: this.selectFields,
		})
	}

	async updateProduct(
		id: string,
		data: Prisma.ProductUpdateInput,
	): Promise<ProductExtended | null> {
		return prisma.product.update({
			where: { id },
			data,
			select: this.selectFields,
		})
	}

	async updateProductStatus(id: string, status: boolean): Promise<void> {
		await prisma.product.update({
			where: { id },
			data: { active: status },
		})
	}

	async deleteProduct(id: string): Promise<void> {
		await prisma.product.delete({ where: { id } })
	}
}
