import { Prisma } from '@prisma/client';
import { SupplierExtended } from '@/@Types/SupplierExtended';
import { SupplierCreateInput } from '@/@Types/SupplierCreateInput';
import { SupplierUpdateInput } from '@/@Types/SupplierUpdateInput';
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
    // Adicione outros métodos necessários aqui
}
