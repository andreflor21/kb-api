import { SectionsRepository } from '@/repositories/sections-repository';

interface UpdateSectionStatusUseCaseRequest {
    id: string;
    active: boolean;
}

export class UpdateSectionStatusUseCase {
    constructor(private sectionsRepository: SectionsRepository) {}

    async execute({
        id,
        active,
    }: UpdateSectionStatusUseCaseRequest): Promise<void> {
        await this.sectionsRepository.updateSectionStatus(id, active);
    }
}
