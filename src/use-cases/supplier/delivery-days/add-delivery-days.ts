import { SupplierRepository } from '@/repositories/supplier-repository';
import { SupplierExtended as Supplier } from '@/@Types/SupplierExtended';
import { SupplierDeliveryDays } from '@prisma/client';

type AddDeliveryDays = {
    supplierId: string;
    deliveryDays: {
        supplierId: string;
        days: string;
        period: string | null;
        hour: string | null;
    }[];
};

type AddDeliveryDaysResponse = {
    deliveryDays: Partial<SupplierDeliveryDays>[];
};

export class AddDeliveryDaysUseCase {
    constructor(private supplierRepository: SupplierRepository) {}

    async execute({
        supplierId,
        deliveryDays,
    }: AddDeliveryDays): Promise<AddDeliveryDaysResponse> {
        await this.supplierRepository.addDeliveryDays(supplierId, deliveryDays);

        const newdeliveryDays = await this.supplierRepository.listDeliveryDays(
            supplierId
        );

        return { deliveryDays: newdeliveryDays };
    }
}
