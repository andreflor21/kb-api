import type {ProductsRepository} from "@/repositories/products-repository";
import AppError from "@/shared/errors/app-error";


export class UpdateProductStatusUseCase {
     constructor(private productsRepository: ProductsRepository) {
    }
    async execute(id: string, status: boolean): Promise<void> {
         const product = await this.productsRepository.getProductById(id)
        if(!product) {
            throw new AppError('Produto não encontrado', 404)
        }
        await this.productsRepository.updateProductStatus(id, status);
    }
}