import { PrismaSectionRepository } from '@/repositories/prisma/prisma-section-repository';
import { UpdateSectionUseCase } from '../../section/update-section';

export function makeUpdateSectionUseCase() {
    const sectionRepository = new PrismaSectionRepository();
    const updateSectionUseCase = new UpdateSectionUseCase(sectionRepository);

    return updateSectionUseCase;
}
