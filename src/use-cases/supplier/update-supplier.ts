import { SupplierRepository } from '@/repositories/supplier-repository';
import { SupplierExtended as Supplier } from '@/@Types/SupplierExtended';

type UpdateSupplierUseCaseRequest = {
    id: string;
    code: string;
    cnpj: string;
    name: string;
    legalName: string;
    ERPCode: string;
    fone: string | null;
    email: string | null;
    userId: string | null;
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
        userId,
    }: UpdateSupplierUseCaseRequest): Promise<UpdateSupplierUseCaseResponse> {
        if (!userId) {
            const supplier = await this.supplierRepository.updateSupplier({
                id,
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
            const supplier = await this.supplierRepository.updateSupplier({
                id,
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
