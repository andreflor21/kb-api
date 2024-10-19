import { PrismaProductGroupsRepository } from "@/repositories/prisma/prisma-product-groups-repository"
import { ListProductGroupsUseCase } from "@/use-cases/products/groups/list-groups"

export const makeListProductGroupUseCase = () => {
	const prismaProductGroupsRepository = new PrismaProductGroupsRepository()
	const listProductGroupUseCase = new ListProductGroupsUseCase(
		prismaProductGroupsRepository,
	)
	return listProductGroupUseCase
}
