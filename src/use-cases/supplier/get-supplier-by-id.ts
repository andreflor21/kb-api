import { SupplierRepository } from '@/repositories/supplier-repository';
import { SupplierExtended as Supplier } from '@/@Types/SupplierExtended';

type GetSupplierByIdUseCaseRequest = {
    id: string;
};

type GetSupplierByIdUseCaseResponse = {
    supplier: Supplier | null;
};

export class GetSupplierByIdUseCase {
    constructor(private supplierRepository: SupplierRepository) {}

    async execute({
        id,
    }: GetSupplierByIdUseCaseRequest): Promise<GetSupplierByIdUseCaseResponse> {
        const supplier = await this.supplierRepository.getSupplierById(id);
        return { supplier };
    }
}
