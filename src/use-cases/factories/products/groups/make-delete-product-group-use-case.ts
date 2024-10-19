import { PrismaProductGroupsRepository } from "@/repositories/prisma/prisma-product-groups-repository"
import { DeleteProductGroupUseCase } from "@/use-cases/products/groups/delete-group"

export const makeDeleteProductGroupUseCase = () => {
	const prismaProductGroupsRepository = new PrismaProductGroupsRepository()
	const deleteProductGroupUseCase = new DeleteProductGroupUseCase(
		prismaProductGroupsRepository,
	)
	return deleteProductGroupUseCase
}
