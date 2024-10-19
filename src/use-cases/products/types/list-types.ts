import type {ProductTypeRepository} from "@/repositories/product-types-repository";
import {ProductType} from "@prisma/client";

type ListTypesResponse = {
    productTypes: ProductType[];
}

export class ListProductTypesUseCase {
    constructor(private readonly productTypeRepository: ProductTypeRepository) {}
    async execute(): Promise<ListTypesResponse> {
        const productTypes = await this.productTypeRepository.getProductTypes();
        return { productTypes };
    }
}