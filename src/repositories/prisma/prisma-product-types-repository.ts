import { prisma } from "@/lib/prisma"
import AppError from "@/shared/errors/app-error"
import type { Prisma } from "@prisma/client"
import type { ProductTypeRepository } from "../product-types-repository"

export class PrismaProductTypesRepository implements ProductTypeRepository {
	async createProductType(data: Prisma.ProductTypeCreateInput) {
		const productType = await prisma.productType.findUnique({
			where: { description: data.description },
		})
		if (productType) {
			throw new AppError("Tipo de produto já cadastrado", 409)
		}
		return await prisma.productType.create({ data })
	}

	async getProductTypeById(id: string) {
		return await prisma.productType.findUnique({ where: { id } })
	}

	async getProductTypeByDescription(description: string) {
		return await prisma.productType.findUnique({ where: { description } })
	}

	async getProductTypes() {
		return await prisma.productType.findMany()
	}

	async updateProductType(id: string, data: Prisma.ProductTypeUpdateInput) {
		const productType = await prisma.productType.findUnique({
			where: { id },
		})
		if (!productType) {
			throw new AppError("Tipo de produto não encontrado", 404)
		}
		return await prisma.productType.update({ where: { id }, data })
	}

	async deleteProductType(id: string) {
		await prisma.productType.delete({ where: { id } })
	}
}
