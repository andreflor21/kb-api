import { PrismaProductTypesRepository } from "@/repositories/prisma/prisma-product-types-repository"
import { DeleteProductTypeUseCase } from "@/use-cases/products/types/delete-type"

export const makeDeleteProductTypeUseCase = () => {
	const prismaProductTypesRepository = new PrismaProductTypesRepository()
	return new DeleteProductTypeUseCase(prismaProductTypesRepository)
}
