import { Prisma, SupplierAddress } from '@prisma/client';

export interface AddressRepository {
    createAddress(
        data: Prisma.SupplierAddressCreateInput
    ): Promise<SupplierAddress>;
    getAddressById(id: string): Promise<SupplierAddress | null>;
    getAddresses(): Promise<SupplierAddress[]>;
    getAddressesBySupplierId(supplierId: string): Promise<SupplierAddress[]>;
    updateAddress(
        id: string,
        data: Prisma.SupplierAddressUpdateInput
    ): Promise<SupplierAddress | null>;
    deleteAddress(id: string): Promise<void>;
    // Adicione outros métodos necessários aqui
}
