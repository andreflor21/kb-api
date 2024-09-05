import { SectionsRepository } from '@/repositories/sections-repository';
import { Section } from '@prisma/client';

interface CreateSectionUseCaseRequest {
    description: string;
    code: string;
    branchMatrixCode: string;
    ERPcode: string;
    sectionType: {
        description: string;
        abreviation: string;
    };
}

interface CreateSectionUseCaseResponse {
    section: Partial<Section>;
}

export class CreateSectionUseCase {
    constructor(private sectionsRepository: SectionsRepository) {}

    async execute({
        description,
        code,
        branchMatrixCode,
        ERPcode,
        sectionType,
    }: CreateSectionUseCaseRequest): Promise<CreateSectionUseCaseResponse> {
        const section = await this.sectionsRepository.createSection({
            description,
            code,
            branchMatrixCode,
            ERPcode,
            sectionType: {
                connectOrCreate: {
                    where: {
                        description: sectionType.abreviation,
                    },
                    create: {
                        description: sectionType.description,
                        abrev: sectionType.abreviation,
                    },
                },
            },
        });

        return { section };
    }
}
