import { SupplierRepository } from '@/repositories/supplier-repository';
import { SupplierExtended as Supplier } from '@/@Types/SupplierExtended';

type UpdateSupplierStatusUseCaseRequest = {
    id: string;
    status: boolean;
};

type UpdateSupplierStatusUseCaseResponse = {
    supplier: Supplier;
};

export class UpdateSupplierStatusUseCase {
    constructor(private supplierRepository: SupplierRepository) {}

    async execute({
        id,
        status,
    }: UpdateSupplierStatusUseCaseRequest): Promise<UpdateSupplierStatusUseCaseResponse> {
        const supplier = await this.supplierRepository.updateSupplierStatus(
            id,
            status
        );
        return { supplier };
    }
}
