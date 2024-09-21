import { ProfilesRepository } from '@/repositories/profiles-repository';
import { ProfileNotFoundError } from '@/shared/errors/profile-not-found-error';

export class DeleteProfileUseCase {
    constructor(private profilesRepository: ProfilesRepository) {}

    async execute(id: string) {
        const checkProfile = await this.profilesRepository.getProfileById(id);
        if (!checkProfile) {
            throw new ProfileNotFoundError();
        }
        await this.profilesRepository.deleteProfile(id);
    }
}
