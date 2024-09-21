import { ProfilesRepository } from '@/repositories/profiles-repository';
import { Profile } from '@prisma/client';
import { ProfileAlreadyExistsError } from '@/shared/errors/profile-already-exists-error';

interface CreateProfileUseCaseRequest {
    description: string;
    users: string[];
    routes: string[];
}

interface CreateProfileUseCaseResponse {
    profile: Partial<Profile>;
}

export class CreateProfileUseCase {
    constructor(private profilesRepository: ProfilesRepository) {}

    async execute({
        description,
        users,
        routes,
    }: CreateProfileUseCaseRequest): Promise<CreateProfileUseCaseResponse> {
        const profileWithSameDescription =
            await this.profilesRepository.getProfileByDescription(description);
        if (profileWithSameDescription) {
            throw new ProfileAlreadyExistsError();
        }

        const profile = await this.profilesRepository.createProfile({
            description,
            users: { connect: users.map((id) => ({ id })) },
            routes: { connect: routes.map((id) => ({ id })) },
        });

        return { profile };
    }
}
