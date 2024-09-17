import { ProfileExtended } from '@/@Types/profileExtended';
import { ProfilesRepository } from '@/repositories/profiles-repository';

interface ListProfilesUseCaseResponse {
    profiles: ProfileExtended[];
}

export class ListProfilesUseCase {
    constructor(private profilesRepository: ProfilesRepository) {}

    async execute(): Promise<ListProfilesUseCaseResponse> {
        const profiles = await this.profilesRepository.getProfiles();
        return { profiles };
    }
}
