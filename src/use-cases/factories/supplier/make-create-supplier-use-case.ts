import { CreateSupplierUseCase } from '@/use-cases/supplier/create-supplier';
import { PrismaSupplierRepository } from '@/repositories/prisma/prisma-supplier-repository';

export function makeCreateSupplierUseCase(): CreateSupplierUseCase {
    const supplierRepository = new PrismaSupplierRepository();
    const createSupplierUseCase = new CreateSupplierUseCase(supplierRepository);
    return createSupplierUseCase;
}
