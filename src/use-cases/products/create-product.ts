import { ProductExtended } from '@/@Types/product-extended';
import { ProductsRepository } from '@/repositories/products-repository';
import AppError from '@/shared/errors/app-error';

type CreateProductRequest = {
    code: string;
    description: string;
    additionalDescription?: string;
    stockUnit: string;
    buyUnit: string;
    conversionFactor: number;
    ERPCode?: string;
    supplierLeadTimeDays?: number;
    stockLeadTimeDays?: number;
    productType: string;
    productGroup?: string;
};

type CreateProductResponse = {
    product: ProductExtended;
};

export class CreateProductUseCase {
    constructor(private productsRepository: ProductsRepository) {}

    async execute({
        code,
        description,
        additionalDescription,
        stockUnit,
        buyUnit,
        conversionFactor,
        ERPCode,
        supplierLeadTimeDays,
        stockLeadTimeDays,
        productType,
        productGroup,
    }: CreateProductRequest): Promise<CreateProductResponse> {
        const productWithSameCode =
            await this.productsRepository.getProductByCode(code);
        if (productWithSameCode) {
            throw new AppError('Código já cadastrado', 409);
        }

        const product = await this.productsRepository.createProduct({
            code,
            description,
            additionalDescription,
            stockUnits: {
                connectOrCreate: {
                    where: { abrev: stockUnit },
                    create: { abrev: stockUnit },
                },
            },
            buyUnits: {
                connectOrCreate: {
                    where: { abrev: buyUnit },
                    create: { abrev: buyUnit },
                },
            },
            conversionFactor,
            ERPCode,
            supplierLeadTimeDays,
            stockLeadTimeDays,
            productType: {
                connectOrCreate: {
                    where: { description: productType },
                    create: { description: productType },
                },
            },
            productGroup: productGroup
                ? {
                      connectOrCreate: {
                          where: { description: productGroup },
                          create: { description: productGroup },
                      },
                  }
                : undefined,
        });

        return { product };
    }
}
