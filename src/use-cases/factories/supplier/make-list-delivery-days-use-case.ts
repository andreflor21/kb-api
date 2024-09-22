import { ListDeliveryDaysUseCase } from '@/use-cases/supplier/delivery-days/list-delivery-days';
import { PrismaSupplierRepository } from '@/repositories/prisma/prisma-supplier-repository';

export function makeListDeliveryDaysUseCase(): ListDeliveryDaysUseCase {
    const supplierRepository = new PrismaSupplierRepository();
    const listDeliveryDaysUseCase = new ListDeliveryDaysUseCase(
        supplierRepository
    );
    return listDeliveryDaysUseCase;
}
