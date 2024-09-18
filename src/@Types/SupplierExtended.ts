import { Supplier, SupplierAddress, User } from '@prisma/client';

export type SupplierExtended = {
    addresses: Partial<SupplierAddress>[];
    users: Partial<User>[];
} & Supplier;
