import { PrismaProductTypesRepository } from "@/repositories/prisma/prisma-product-types-repository"
import { ListProductTypesUseCase } from "@/use-cases/products/types/list-types"

export const makeListProductTypeUseCase = () => {
	const prismaProductTypesRepository = new PrismaProductTypesRepository()
	return new ListProductTypesUseCase(prismaProductTypesRepository)
}
