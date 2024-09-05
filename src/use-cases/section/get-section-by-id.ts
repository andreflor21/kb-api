import { SectionsRepository } from '@/repositories/sections-repository';
import { Section } from '@prisma/client';

interface GetSectionByIdUseCaseRequest {
    id: string;
}

interface GetSectionByIdUseCaseResponse {
    section: Partial<Section> | null;
}

export class GetSectionByIdUseCase {
    constructor(private sectionsRepository: SectionsRepository) {}

    async execute({
        id,
    }: GetSectionByIdUseCaseRequest): Promise<GetSectionByIdUseCaseResponse> {
        const section = await this.sectionsRepository.getSectionById(id);

        return { section };
    }
}
