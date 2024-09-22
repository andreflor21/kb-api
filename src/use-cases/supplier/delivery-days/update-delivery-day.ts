import { SupplierRepository } from '@/repositories/supplier-repository';
import { SupplierExtended as Supplier } from '@/@Types/SupplierExtended';

type UpdateDeliveryDay = {
    id: string;
    supplierId: string;
    days: number[];
    period: string;
    hour: string;
};

type UpdateDeliveryDayResponse = {
    supplier: Supplier;
};

export class UpdateDeliveryDayUseCase {
    constructor(private supplierRepository: SupplierRepository) {}

    async execute({
        id,
        supplierId,
        days,
        period,
        hour,
    }: UpdateDeliveryDay): Promise<UpdateDeliveryDayResponse> {
        await this.supplierRepository.updateDeliveryDays(id, {
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
