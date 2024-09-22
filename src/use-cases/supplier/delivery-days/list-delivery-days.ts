import { SupplierRepository } from '@/repositories/supplier-repository';
import { SupplierExtended as Supplier } from '@/@Types/SupplierExtended';

type ListDeliveryDays = {
    supplierId: string;
};

type ListDeliveryDaysResponse = {
    supplier: Supplier;
};

export class ListDeliveryDaysUseCase {
    constructor(private supplierRepository: SupplierRepository) {}

    async execute({
        supplierId,
    }: ListDeliveryDays): Promise<ListDeliveryDaysResponse> {
        const supplier = await this.supplierRepository.listDeliveryDays(
            supplierId
        );

        return { supplier };
    }
}
