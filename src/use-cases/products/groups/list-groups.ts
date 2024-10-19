import type {ProductGroupsRepository} from "@/repositories/product-groups-repository";
import type {ProductGroup} from "@prisma/client";

type ListGroupsResponse = {
    productGroups: ProductGroup[];
}

export class ListProductGroupsUseCase {
    constructor(private readonly productGroupsRepository: ProductGroupsRepository) {}
    async execute(): Promise<ListGroupsResponse> {
        const productGroups = await this.productGroupsRepository.getProductGroups();
        return { productGroups };
    }
}