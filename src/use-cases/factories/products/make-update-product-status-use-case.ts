import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository"
import { UpdateProductStatusUseCase } from "@/use-cases/products/update-product-status"

export const makeUpdateProductStatusUseCase = () => {
	const prismaProductsRepository = new PrismaProductsRepository()
	return new UpdateProductStatusUseCase(prismaProductsRepository)
}
