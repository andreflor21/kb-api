import { SupplierRepository } from '@/repositories/supplier-repository';
import { SupplierExtended as Supplier } from '@/@Types/SupplierExtended';

type AddDeliveryDays = {
    supplierId: string;
    days: number[];
    period: string;
    hour: string;
};

type AddDeliveryDaysResponse = {
    supplier: Supplier;
};

export class AddDeliveryDaysUseCase {
    constructor(private supplierRepository: SupplierRepository) {}

    async execute({
        supplierId,
        days,
        period,
        hour,
    }: AddDeliveryDays): Promise<AddDeliveryDaysResponse> {
        await this.supplierRepository.addDeliveryDays(supplierId, {
            days: days.join(','),
            period,
            hour,
            supplier: { connect: { id: supplierId } },
        });

        const supplier = await this.supplierRepository.getSupplierById(
            supplierId
        );

        return { supplier };
    }
}
