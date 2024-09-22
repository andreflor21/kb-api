import { Prisma, SupplierDeliveryDays } from '@prisma/client';
import { SupplierExtended } from '@/@Types/SupplierExtended';

export interface SupplierRepository {
    createSupplier(data: Prisma.SupplierCreateInput): Promise<SupplierExtended>;
    getSupplierById(id: string): Promise<SupplierExtended>;
    getSuppliers(): Promise<SupplierExtended[]>;
    updateSupplier(
        id: string,
        data: Prisma.SupplierUpdateInput
    ): Promise<SupplierExtended | null>;
    updateSupplierStatus(
        id: string,
        status: boolean
    ): Promise<SupplierExtended>;
    deleteSupplier(id: string): Promise<void>;

    // Metodos para dias de entrega
    addDeliveryDays(
        supplierId: string,
        data: Prisma.SupplierDeliveryDaysCreateInput
    ): Promise<void>;
    updateDeliveryDays(
        id: string,
        data: Prisma.SupplierDeliveryDaysUpdateInput
    ): Promise<void>;
    listDeliveryDays(supplierId: string): Promise<SupplierExtended>;
    getDeliveryDaysById(id: string): Promise<SupplierDeliveryDays>;
    removeDeliveryDays(id: string): Promise<void>;

    // Metodos para importação via planilha
    importSuppliers(
        data: Prisma.SupplierUpdateInput[]
    ): Promise<SupplierExtended[]>;
}
