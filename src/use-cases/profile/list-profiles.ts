import { ProfilesRepository } from '@/repositories/profiles-repository';
import { Profile } from '@prisma/client';

interface ListProfilesUseCaseResponse {
    profiles: Profile[];
}

export class ListProfilesUseCase {
    constructor(private profilesRepository: ProfilesRepository) {}

    async execute(): Promise<ListProfilesUseCaseResponse> {
        const profiles = await this.profilesRepository.getProfiles();
        return { profiles };
    }
}
