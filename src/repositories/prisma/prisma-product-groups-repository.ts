import { prisma } from "@/lib/prisma"
import AppError from "@/shared/errors/app-error"
import type { Prisma } from "@prisma/client"
import type { ProductGroupsRepository } from "../product-groups-repository"

export class PrismaProductGroupsRepository implements ProductGroupsRepository {
	async createProductGroup(data: Prisma.ProductGroupCreateInput) {
		const productGroup = await prisma.productGroup.findUnique({
			where: { description: data.description },
		})
		if (productGroup) {
			throw new AppError("Grupo de produto já cadastrado", 409)
		}
		return await prisma.productGroup.create({ data })
	}

	async getProductGroupById(id: string) {
		return await prisma.productGroup.findUnique({ where: { id } })
	}
	async getProductGroupByDescription(description: string) {
		return await prisma.productGroup.findUnique({ where: { description } })
	}

	async getProductGroups() {
		return await prisma.productGroup.findMany()
	}

	async updateProductGroup(id: string, data: Prisma.ProductGroupUpdateInput) {
		const productGroup = await prisma.productGroup.findUnique({
			where: { id },
		})
		if (!productGroup) {
			throw new AppError("Grupo de produto não encontrado", 404)
		}
		return await prisma.productGroup.update({ where: { id }, data })
	}

	async deleteProductGroup(id: string) {
		await prisma.productGroup.delete({ where: { id } })
	}
}
