import { SectionTypesRepository } from '@/repositories/section-types-repository';
import { SectionType } from '@prisma/client';

interface GetSectionTypeByIdUseCaseResponse {
    sectionType: Partial<SectionType> | null;
}

export class GetSectionTypeByIdUseCase {
    constructor(private sectionTypesRepository: SectionTypesRepository) {}

    async execute(id: string): Promise<GetSectionTypeByIdUseCaseResponse> {
        const sectionType =
            await this.sectionTypesRepository.getSectionTypeById(id);

        return { sectionType };
    }
}
