import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository"
import { ListProductsUseCase } from "@/use-cases/products/list-products"

export const makeListProductsUseCase = () => {
	const prismaProductsRepository = new PrismaProductsRepository()
	return new ListProductsUseCase(prismaProductsRepository)
}
