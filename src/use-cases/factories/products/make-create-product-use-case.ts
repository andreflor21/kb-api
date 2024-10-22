import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository"
import { CreateProductUseCase } from "@/use-cases/products/create-product"

export function makeCreateProductUseCase() {
	const productsRepository = new PrismaProductsRepository()
	const createProductUseCase = new CreateProductUseCase(productsRepository)
	return createProductUseCase
}
