import { GetDeliveryDaysUseCase } from '@/use-cases/supplier/delivery-days/get-delivery-days-by-id';
import { PrismaSupplierRepository } from '@/repositories/prisma/prisma-supplier-repository';

export function makeGetDeliveryDaysUseCase(): GetDeliveryDaysUseCase {
    const supplierRepository = new PrismaSupplierRepository();
    const getDeliveryDaysUseCase = new GetDeliveryDaysUseCase(
        supplierRepository
    );
    return getDeliveryDaysUseCase;
}