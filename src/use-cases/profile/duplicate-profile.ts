import { ProfileNotFoundError } from '@/shared/errors/profile-not-found-error';
import { ProfilesRepository } from '@/repositories/profiles-repository';
import { ProfileExtended } from '@/@Types/profileExtended';

export class DuplicateProfileUseCase {
    constructor(private profilesRepository: ProfilesRepository) {}

    async execute(
        profileId: string,
        description: string
    ): Promise<ProfileExtended | null> {
        const profile = await this.profilesRepository.getProfileById(profileId);
        if (!profile) {
            throw new ProfileNotFoundError();
        }
        return this.profilesRepository.duplicateProfile(profileId, description);
    }
}
