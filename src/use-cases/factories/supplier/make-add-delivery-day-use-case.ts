import { AddDeliveryDaysUseCase } from '@/use-cases/supplier/delivery-days/add-delivery-days';
import { PrismaSupplierRepository } from '@/repositories/prisma/prisma-supplier-repository';

export function makeAddDeliveryDayUseCase(): AddDeliveryDaysUseCase {
    const supplierRepository = new PrismaSupplierRepository();
    const addDeliveryDaysUseCase = new AddDeliveryDaysUseCase(
        supplierRepository
    );
    return addDeliveryDaysUseCase;
}
