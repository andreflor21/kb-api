import { Prisma, Supplier } from '@prisma/client';
import { SupplierExtended } from '@/@Types/SupplierExtended';
export interface SupplierRepository {
    createSupplier(data: Prisma.SupplierCreateInput): Promise<SupplierExtended>;
    getSupplierById(id: string): Promise<SupplierExtended | null>;
    getSuppliers(): Promise<SupplierExtended[]>;
    updateSupplier(
        data: Prisma.SupplierUpdateInput
    ): Promise<SupplierExtended | null>;
    updateSupplierStatus(
        id: string,
        status: boolean
    ): Promise<SupplierExtended>;
    deleteSupplier(id: string): Promise<void>;
    // Adicione outros métodos necessários aqui
}
