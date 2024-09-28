import type {ProductGroupsRepository} from "@/repositories/product-groups-repository"
import AppError from "@/shared/errors/app-error"
import {ProductGroup} from "@prisma/client";

type UpdateGroupRequest = {
    id: string;
    description: string;
}
type UpdateGroupResponse = {
    productGroup: ProductGroup | null;
}

export class UpdateProductGroupUseCase {
    constructor(private productsRepository: ProductGroupsRepository) {}
    async execute(data: UpdateGroupRequest): Promise<UpdateGroupResponse> {
        const productGroup = await this.productsRepository.updateProductGroup(data.id,data);
        if (!productGroup) {
            throw new AppError("Grupo de produto não encontrado", 404);
        }
        return { productGroup };
    }
}