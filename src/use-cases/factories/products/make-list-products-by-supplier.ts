import {PrismaProductsRepository} from "@/repositories/prisma/prisma-products-repository";
import {ListProductsBySupplierIdUseCase} from "@/use-cases/products/list-products-by-supplier-id";

export const makeListProductsBySupplierUseCase = () =>{
    const prismaProductsRepository = new PrismaProductsRepository();
    return new ListProductsBySupplierIdUseCase(prismaProductsRepository);
}