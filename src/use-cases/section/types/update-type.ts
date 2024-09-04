import { SectionTypesRepository } from '@/repositories/section-types-repository';
import { SectionType } from '@prisma/client';

interface UpdateTypeUseCaseRequest {
    id: string;
    abreviation: string;
    description: string;
}

interface UpdateSectionTypeUseCaseResponse {
    sectionType: Partial<SectionType> | null;
}

export class UpadateSectionTypeUseCase {
    constructor(private sectionTypesRepository: SectionTypesRepository) {}

    async execute({
        id,
        abreviation,
        description,
    }: UpdateTypeUseCaseRequest): Promise<UpdateSectionTypeUseCaseResponse> {
        const sectionType = await this.sectionTypesRepository.updateSectionType(
            id,
            {
                abrev: abreviation,
                description,
            }
        );

        return { sectionType };
    }
}
