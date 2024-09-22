import { ImportSuppliersUseCase } from '@/use-cases/supplier/import-suppliers';
import { PrismaSupplierRepository } from '@/repositories/prisma/prisma-supplier-repository';

export function makeImportSuppliersUseCase(): ImportSuppliersUseCase {
    const supplierRepository = new PrismaSupplierRepository();
    const importSuppliersUseCase = new ImportSuppliersUseCase(
        supplierRepository
    );
    return importSuppliersUseCase;
}
