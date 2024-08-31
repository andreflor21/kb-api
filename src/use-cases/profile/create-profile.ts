import { ProfilesRepository } from '@/repositories/profiles-repository';
import { Profile } from '@prisma/client';
import { ProfileAlreadyExistsError } from '@/shared/errors/profile-already-exists-error';

interface CreateProfileUseCaseRequest {
    description: string;
}

interface CreateProfileUseCaseResponse {
    profile: Partial<Profile>;
}

export class CreateProfileUseCase {
    constructor(private profilesRepository: ProfilesRepository) {}

    async execute({
        description,
    }: CreateProfileUseCaseRequest): Promise<CreateProfileUseCaseResponse> {
        const profileWithSameDescription =
            await this.profilesRepository.getProfileByDescription(description);
        if (profileWithSameDescription) {
            throw new ProfileAlreadyExistsError();
        }

        const profile = await this.profilesRepository.createProfile({
            description,
        });

        return { profile };
    }
}
