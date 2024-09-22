import {
    Supplier,
    SupplierAddress,
    User,
    SupplierDeliveryDays,
    Product,
} from '@prisma/client';

export type SupplierExtended = {
    addresses?: Partial<SupplierAddress>[];
    users?: Partial<User>[];
    deliveryDays?: Partial<SupplierDeliveryDays>[];
    products?: Partial<Product>[];
} & Supplier;
