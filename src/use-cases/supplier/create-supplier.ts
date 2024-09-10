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
    userId: string | null;
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
        userId,
    }: CreateSupplierUseCaseRequest): Promise<CreateSupplierUseCaseResponse> {
        if (!userId) {
            const supplier = await this.supplierRepository.createSupplier({
                code,
                cnpj,
                name,
                legalName,
                ERPCode,
                fone,
                email,
            });
            return { supplier };
        } else {
            const supplier = await this.supplierRepository.createSupplier({
                code,
                cnpj,
                name,
                legalName,
                ERPCode,
                fone,
                email,
                userResp: {
                    connect: {
                        id: userId,
                    },
                },
            });
            return { supplier };
        }
    }
}
