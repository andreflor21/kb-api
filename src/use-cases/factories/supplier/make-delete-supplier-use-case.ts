import { PrismaSupplierRepository } from '@/repositories/prisma/prisma-supplier-repository';
import { DeleteSupplierUseCase } from '@/use-cases/supplier/delete-supplier';

export function makeDeleteSupplierUseCase(): DeleteSupplierUseCase {
    const supplierRepository = new PrismaSupplierRepository();
    const deleteSupplierUseCase = new DeleteSupplierUseCase(supplierRepository);
    return deleteSupplierUseCase;
}
