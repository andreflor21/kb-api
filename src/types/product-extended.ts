import type {
	Product,
	ProductGroup,
	ProductType,
	Supplier,
	Units,
} from "@prisma/client"

export type ProductExtended = Partial<Product> & {
	suppliers: {
		supplier: Partial<Supplier>
		supplierProductCode: string
		minQty: number | null
		buyQty: number | null
		leadTime: number | null
		stockLeadTime: number | null
	}[]
	productType: Partial<ProductType> | null
	productGroup: Partial<ProductGroup> | null
	buyUnit: Partial<Units>
}
