import { SupplierRepository } from '@/repositories/supplier-repository';
import { SupplierExtended as Supplier } from '@/@Types/SupplierExtended';
import { SupplierNotFoundError } from '@/shared/errors/supplier-not-found-error';

type UpdateSupplierUseCaseRequest = {
    id: string;
    code: string;
    cnpj: string;
    name: string;
    legalName: string;
    ERPCode: string;
    fone: string | null;
    email: string | null;
    users: string[];
};

type UpdateSupplierUseCaseResponse = {
    supplier: Supplier | null;
};

export class UpdateSupplierUseCase {
    constructor(private supplierRepository: SupplierRepository) {}

    async execute({
        id,
        code,
        cnpj,
        name,
        legalName,
        ERPCode,
        fone,
        email,
        users,
    }: UpdateSupplierUseCaseRequest): Promise<UpdateSupplierUseCaseResponse> {
        const supplier = await this.supplierRepository.updateSupplier(id, {
            code,
            cnpj,
            name,
            legalName,
            ERPCode,
            fone,
            email,
            users: { set: users.map((id) => ({ id })) },
        });
        if (!supplier) throw new SupplierNotFoundError();
        return { supplier };
    }
}
