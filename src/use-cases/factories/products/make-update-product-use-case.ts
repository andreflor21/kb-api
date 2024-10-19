import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository"
import { UpdateProductUseCase } from "@/use-cases/products/update-product"

export const makeUpdateProductUseCase = () => {
	const prismaProductsRepository = new PrismaProductsRepository()
	return new UpdateProductUseCase(prismaProductsRepository)
}
