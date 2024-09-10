import { SectionsRepository } from '@/repositories/sections-repository';
import { SectionNotFoundError } from '@/shared/errors/section-not-found-error';
import { Section } from '@prisma/client';

interface UpdateSectionUseCaseRequest {
    id: string;
    description: string;
    code: string;
    branchMatrixCode: string;
    ERPcode: string;
    sectionType: string;
}

interface UpdateSectionUseCaseResponse {
    section: Partial<Section> | null;
}

export class UpdateSectionUseCase {
    constructor(private sectionsRepository: SectionsRepository) {}

    async execute({
        id,
        description,
        code,
        branchMatrixCode,
        ERPcode,
        sectionType,
    }: UpdateSectionUseCaseRequest): Promise<UpdateSectionUseCaseResponse> {
        const section = await this.sectionsRepository.updateSection(id, {
            description,
            code,
            branchMatrixCode,
            ERPcode,
            sectionType: {
                connect: {
                    id: sectionType,
                },
            },
        });
        if (!section) throw new SectionNotFoundError();
        return { section };
    }
}
