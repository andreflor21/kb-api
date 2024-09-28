import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository"
import { DeleteProductUseCase } from "@/use-cases/products/delete-product"

export const makeDeleteProductUseCase = () => {
	const prismaProductsRepository = new PrismaProductsRepository()
	return new DeleteProductUseCase(prismaProductsRepository)
}
