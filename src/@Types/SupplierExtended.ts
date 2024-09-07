import { Supplier, SupplierAddress } from '@prisma/client';

export type SupplierExtended = {
    addresses: Partial<SupplierAddress>[];
} & Supplier;
