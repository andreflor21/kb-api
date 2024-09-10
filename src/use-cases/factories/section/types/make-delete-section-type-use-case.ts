import { PrismaSectionTypesRepository } from '@/repositories/prisma/prisma-section-types-repository';
import { DeleteSectionTypeUseCase } from '@/use-cases/section/types/delete-section-type';

export function makeDeleteSectionTypeUseCase() {
    const sectionTypesRepository = new PrismaSectionTypesRepository();
    const deleteSectionTypeUseCase = new DeleteSectionTypeUseCase(
        sectionTypesRepository
    );

    return deleteSectionTypeUseCase;
}
