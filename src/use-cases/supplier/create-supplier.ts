import { SupplierRepository } from '@/repositories/supplier-repository';
import { SupplierExtended as Supplier } from '@/@Types/SupplierExtended';
import { validateCpfCnpj } from '@/shared/utils/validate-cpf-cnpj';
import AppError from '@/shared/errors/app-error';

type CreateSupplierUseCaseRequest = {
    code: string | null;
    cnpj: string | null;
    name: string;
    legalName: string | null;
    ERPCode: string | null;
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
        if (cnpj) {
            if (!validateCpfCnpj(cnpj)) {
                throw new AppError('CNPJ inválido', 400);
            }
        }

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
