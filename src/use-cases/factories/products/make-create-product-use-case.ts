import { CreateProductUseCase } from '@/use-cases/products/create-product';
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository';

export function makeCreateProductUseCase() {
    const productsRepository = new PrismaProductsRepository();
    const createProductUseCase = new CreateProductUseCase(productsRepository);
    return createProductUseCase;
}
