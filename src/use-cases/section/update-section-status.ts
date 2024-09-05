import { SectionsRepository } from '@/repositories/sections-repository';

interface UpdateSectionStatusUseCaseRequest {
    id: string;
    status: boolean;
}

export class UpdateSectionStatusUseCase {
    constructor(private sectionsRepository: SectionsRepository) {}

    async execute({
        id,
        status,
    }: UpdateSectionStatusUseCaseRequest): Promise<void> {
        await this.sectionsRepository.updateSectionStatus(id, status);
    }
}
