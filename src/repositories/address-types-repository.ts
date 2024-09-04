import { Prisma, AddressType } from '@prisma/client';

export interface AddressTypesRepository {
    createAddressType(
        data: Prisma.AddressTypeCreateInput
    ): Promise<AddressType>;
    getAddressTypeById(id: string): Promise<AddressType | null>;
    getAddressTypes(): Promise<AddressType[]>;
    updateAddressType(
        id: string,
        data: Prisma.AddressTypeUpdateInput
    ): Promise<AddressType | null>;
    deleteAddressType(id: string): Promise<void>;
    // Adicione outros métodos necessários aqui
}
