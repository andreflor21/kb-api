import { PrismaSectionTypesRepository } from '@/repositories/prisma/prisma-section-types-repository';
import { GetSectionTypeByIdUseCase } from '@/use-cases/section/types/get-section-type-by-id';

export function makeGetSectionTypeByIdUseCase() {
    const sectionTypesRepository = new PrismaSectionTypesRepository();
    const getSectionTypeByIdUseCase = new GetSectionTypeByIdUseCase(
        sectionTypesRepository
    );

    return getSectionTypeByIdUseCase;
}
