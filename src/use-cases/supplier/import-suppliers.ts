import { SupplierRepository } from '@/repositories/supplier-repository';
import { Supplier } from '@prisma/client';

type ImportSuppliers = {
    suppliers: Supplier[];
};

type ImportSuppliersResponse = {
    suppliers: Supplier[];
};

export class ImportSuppliersUseCase {
    constructor(private supplierRepository: SupplierRepository) {}

    async execute({
        suppliers,
    }: ImportSuppliers): Promise<ImportSuppliersResponse> {
        await this.supplierRepository.importSuppliers(suppliers);

        return { suppliers };
    }
}
