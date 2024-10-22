import { PrismaProductTypesRepository } from "@/repositories/prisma/prisma-product-types-repository"
import { UpdateTypeUseCase } from "@/use-cases/products/types/update-type"

export const makeUpdateProductTypeUseCase = () => {
	const prismaProductTypesRepository = new PrismaProductTypesRepository()
	return new UpdateTypeUseCase(prismaProductTypesRepository)
}
