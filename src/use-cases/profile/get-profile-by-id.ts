import { ProfilesRepository } from '@/repositories/profiles-repository';
import { Profile } from '@prisma/client';

interface GetProfileByIdUseCaseRequest {
    id: string;
}

interface GetProfileByIdUseCaseResponse {
    profile: Profile | null;
}

export class GetProfileByIdUseCase {
    constructor(private profilesRepository: ProfilesRepository) {}

    async execute({
        id,
    }: GetProfileByIdUseCaseRequest): Promise<GetProfileByIdUseCaseResponse> {
        const profile = await this.profilesRepository.getProfileById(id);

        return { profile };
    }
}
