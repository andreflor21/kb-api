import {PrismaProductsRepository} from "@/repositories/prisma/prisma-products-repository";
import {GetProductByCodeUseCase} from "@/use-cases/products/get-product-by-code";

export const makeGetProductByCodeUseCase = () => {
    const prismaProductsRepository = new PrismaProductsRepository()
    return new GetProductByCodeUseCase(prismaProductsRepository)
}