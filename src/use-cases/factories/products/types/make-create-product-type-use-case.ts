import { PrismaProductTypesRepository } from "@/repositories/prisma/prisma-product-types-repository"
import { CreateProductTypeUseCase } from "@/use-cases/products/types/create-type"

export const makeCreateProductTypeUseCase = () => {
	const prismaProductTypesRepository = new PrismaProductTypesRepository()
	return new CreateProductTypeUseCase(prismaProductTypesRepository)
}
