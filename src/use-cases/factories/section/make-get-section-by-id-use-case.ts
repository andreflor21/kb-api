import { PrismaSectionRepository } from '@/repositories/prisma/prisma-section-repository';
import { GetSectionByIdUseCase } from '../../section/get-section-by-id';

export function makeGetSectionByIdUseCase() {
    const sectionRepository = new PrismaSectionRepository();
    const getSectionByIdUseCase = new GetSectionByIdUseCase(sectionRepository);

    return getSectionByIdUseCase;
}
