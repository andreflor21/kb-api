import type {ProductGroupsRepository} from "@/repositories/product-groups-repository";
import AppError from "@/shared/errors/app-error";
import {ProductGroup} from "@prisma/client";

type ProductGroupResponse = {
    productGroup: ProductGroup;
}

export class CreateProductGroupUseCase {
    constructor(private productGroupsRepository: ProductGroupsRepository) {}
    async execute(description: string): Promise<ProductGroupResponse> {
        const checkGroup = await this.productGroupsRepository.getProductGroupByDescription(description);
        if(checkGroup) {
            throw new AppError("Grupo de produto já cadastrado", 409);
        }

        const productGroup = await this.productGroupsRepository.createProductGroup({description});
        return { productGroup };
    }
}