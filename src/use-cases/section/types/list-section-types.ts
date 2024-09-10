import { SectionTypesRepository } from '@/repositories/section-types-repository';
import { SectionType } from '@prisma/client';

interface ListSectionTypeUseCaseResponse {
    sectionTypes: Partial<SectionType>[];
}

export class ListSectionTypeUseCase {
    constructor(private sectionTypesRepository: SectionTypesRepository) {}

    async execute(): Promise<ListSectionTypeUseCaseResponse> {
        const sectionTypes =
            await this.sectionTypesRepository.getSectionTypes();

        return { sectionTypes };
    }
}
