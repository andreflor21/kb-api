import { prisma } from "@/lib/prisma"
import type { Prisma, SupplierProduct } from "@prisma/client"
import type { SupplierProductsRepository } from "../supplier-products-repository"

export class PrismaSupplierProductsRepository
	implements SupplierProductsRepository
{
	async createSupplierProduct(
		data: Prisma.SupplierProductCreateInput,
	): Promise<SupplierProduct> {
		return await prisma.supplierProduct.create({
			data: {
				...data,
				buyUnit: {
					connectOrCreate: {
						where: {
							abrev: (data.buyUnit as string).toUpperCase(),
						},
						create: {
							abrev: (data.buyUnit as string).toUpperCase(),
						},
					},
				},
			},
		})
	}

	async getSupplierProductById(id: string): Promise<SupplierProduct | null> {
		return await prisma.supplierProduct.findUnique({ where: { id } })
	}

	async getSupplierProducts(
		supplierId: string,
		skip: number,
		take: number,
	): Promise<SupplierProduct[]> {
		return await prisma.supplierProduct.findMany({
			where: { supplierId },
			skip,
			take,
		})
	}

	async updateSupplierProduct(
		id: string,
		data: Prisma.SupplierProductUpdateInput,
	): Promise<SupplierProduct | null> {
		return await prisma.supplierProduct.update({
			where: { id },
			data: {
				...data,
				buyUnit: {
					connectOrCreate: {
						where: {
							abrev: (data.buyUnit as string).toUpperCase(),
						},
						create: {
							abrev: (data.buyUnit as string).toUpperCase(),
						},
					},
				},
			},
		})
	}

	async deleteSupplierProductStatus(id: string): Promise<void> {
		await prisma.supplierProduct.delete({ where: { id } })
	}

	async updateSupplierProductStatus(
		id: string,
		status: boolean,
	): Promise<void> {
		await prisma.supplierProduct.update({
			where: { id },
			data: { active: status },
		})
	}

	async countSupplierProducts(supplierId: string): Promise<number> {
		return await prisma.supplierProduct.count({ where: { supplierId } })
	}
}
