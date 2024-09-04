import { AddressTypesRepository } from '../address-types-repository';
import { Prisma, AddressType } from '@prisma/client';
import { randomUUID } from 'crypto';
import { AddressTypeNotFoundError } from '@/shared/errors/address-type-not-found-error';

export class InMemoryAddressTypesRepository implements AddressTypesRepository {
    private addressTypes: AddressType[] = [];

    public async createAddressType(
        data: Prisma.AddressTypeCreateInput
    ): Promise<AddressType> {
        const newAddressType: AddressType = {
            id: randomUUID(),
            description: data.description,
        };

        this.addressTypes.push(newAddressType);

        return newAddressType;
    }

    public async getAddressTypes(): Promise<AddressType[]> {
        return this.addressTypes;
    }

    public async getAddressTypeById(id: string): Promise<AddressType | null> {
        const addressType = this.addressTypes.find(
            (addressType) => addressType.id == id
        );

        return addressType ? addressType : null;
    }

    public async updateAddressType(
        id: string,
        data: Prisma.AddressTypeUpdateInput
    ): Promise<AddressType | null> {
        const findAddressType = this.addressTypes.find(
            (addressType) => addressType.id == id
        );

        if (findAddressType) {
            findAddressType.description =
                (data.description as string) ?? findAddressType.description;

            this.addressTypes[this.addressTypes.map((x) => x.id).indexOf(id)] =
                findAddressType;
            return findAddressType;
        } else {
            return null;
        }
    }

    public async deleteAddressType(id: string): Promise<void> {
        this.addressTypes = this.addressTypes.filter(
            (addressType) => addressType.id != id
        );
    }
}
