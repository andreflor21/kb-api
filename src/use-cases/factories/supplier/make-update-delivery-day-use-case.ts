import { UpdateDeliveryDayUseCase } from '@/use-cases/supplier/delivery-days/update-delivery-day';
import { PrismaSupplierRepository } from '@/repositories/prisma/prisma-supplier-repository';

export function makeUpdateDeliveryDayUseCase(): UpdateDeliveryDayUseCase {
    const supplierRepository = new PrismaSupplierRepository();
    const updateDeliveryDayUseCase = new UpdateDeliveryDayUseCase(
        supplierRepository
    );
    return updateDeliveryDayUseCase;
}
