import {
    Supplier,
    Product,
    ProductGroup,
    ProductType,
    Units,
} from '@prisma/client';

export type ProductExtended = Partial<Product> & {
    suppliers: {
        supplier: Partial<Supplier>;
        supplierProductCode: string;
        minQty: number | null;
        buyQty: number | null;
        leadTime: number | null;
    }[];
    productType: Partial<ProductType> | null;
    productGroup: Partial<ProductGroup> | null;
    stockUnits: Units[];
    buyUnits: Units[];
};
