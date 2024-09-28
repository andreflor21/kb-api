import {PrismaProductsRepository} from "@/repositories/prisma/prisma-products-repository";
import {GetProductByIdUseCase} from "@/use-cases/products/get-product-by-id";

export const makeGetProductByIdUseCase = () => {
    const prismaProductRepository = new PrismaProductsRepository()
    return new GetProductByIdUseCase(prismaProductRepository)
}