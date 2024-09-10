import { SectionsRepository } from '@/repositories/sections-repository';
import { Section } from '@prisma/client';

interface ListSectionsUseCaseResponse {
    sections: Partial<Section>[];
}

export class ListSectionsUseCase {
    constructor(private sectionsRepository: SectionsRepository) {}

    async execute(): Promise<ListSectionsUseCaseResponse> {
        const sections = await this.sectionsRepository.getSections();

        return { sections };
    }
}
