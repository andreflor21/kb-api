import { SupplierRepository } from '@/repositories/supplier-repository';
import { SupplierExtended as Supplier } from '@/@Types/SupplierExtended';

type ListSuppliersUseCaseResponse = {
    suppliers: Supplier[];
};

export class ListSuppliersUseCase {
    constructor(private supplierRepository: SupplierRepository) {}

    async execute(): Promise<ListSuppliersUseCaseResponse> {
        const suppliers = await this.supplierRepository.getSuppliers();
        return { suppliers };
    }
}
