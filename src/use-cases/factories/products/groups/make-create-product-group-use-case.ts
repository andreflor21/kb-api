import { PrismaProductGroupsRepository } from "@/repositories/prisma/prisma-product-groups-repository"
import { CreateProductGroupUseCase } from "@/use-cases/products/groups/create-group"

export const makeCreateProductGroupUseCase = () => {
	const prismaProductGroupsRepository = new PrismaProductGroupsRepository()
	const createProductGroupUseCase = new CreateProductGroupUseCase(
		prismaProductGroupsRepository,
	)
	return createProductGroupUseCase
}
