import { SupplierRepository } from '@/repositories/supplier-repository';
import { SupplierDeliveryDays } from '@prisma/client';

type UpdateDeliveryDay = {
    supplierId: string;
    deliveryDays: {
        id: string;
        supplierId: string;
        days: string;
        period: string | null;
        hour: string | null;
    }[];
};

type UpdateDeliveryDayResponse = {
    deliveryDays: Partial<SupplierDeliveryDays>[];
};

export class UpdateDeliveryDayUseCase {
    constructor(private supplierRepository: SupplierRepository) {}

    async execute({
        supplierId,
        deliveryDays,
    }: UpdateDeliveryDay): Promise<UpdateDeliveryDayResponse> {
        await this.supplierRepository.updateDeliveryDays(
            supplierId,
            deliveryDays
        );

        const updatedDeliveryDays =
            await this.supplierRepository.listDeliveryDays(supplierId);

        return { deliveryDays: updatedDeliveryDays };
    }
}
