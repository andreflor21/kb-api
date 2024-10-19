import { PrismaProductGroupsRepository } from "@/repositories/prisma/prisma-product-groups-repository"
import { UpdateProductGroupUseCase } from "@/use-cases/products/groups/update-group"

export const makeUpdateProductGroupUseCase = () => {
	const prismaProductGroupsRepository = new PrismaProductGroupsRepository()
	const updateProductGroupUseCase = new UpdateProductGroupUseCase(
		prismaProductGroupsRepository,
	)
	return updateProductGroupUseCase
}
