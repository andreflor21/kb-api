import type {ProductGroupsRepository} from "@/repositories/product-groups-repository"
import AppError from "@/shared/errors/app-error"



export class DeleteProductGroupUseCase {
    constructor(private productsRepository: ProductGroupsRepository) {}
    async execute(id: string): Promise<void> {
        const productGroup = await this.productsRepository.getProductGroupById(id);
        if (!productGroup) {
            throw new AppError("Grupo de produto não encontrado", 404);
        }
        await this.productsRepository.deleteProductGroup(id);
    }
}