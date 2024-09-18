import { SupplierRepository } from '@/repositories/supplier-repository';
import { SupplierExtended as Supplier } from '@/@Types/SupplierExtended';

type CreateSupplierUseCaseRequest = {
    code: string;
    cnpj: string;
    name: string;
    legalName: string;
    ERPCode: string;
    fone: string | null;
    email: string | null;
    users: string[];
};

type CreateSupplierUseCaseResponse = {
    supplier: Supplier;
};

export class CreateSupplierUseCase {
    constructor(private supplierRepository: SupplierRepository) {}

    async execute({
        code,
        cnpj,
        name,
        legalName,
        ERPCode,
        fone,
        email,
        users,
    }: CreateSupplierUseCaseRequest): Promise<CreateSupplierUseCaseResponse> {
        const supplier = await this.supplierRepository.createSupplier({
            code,
            cnpj,
            name,
            legalName,
            ERPCode,
            fone,
            email,
            users: { connect: users.map((id) => ({ id })) },
        });
        return { supplier };
    }
}
