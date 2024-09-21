import { PrismaProfilesRepository } from '@/repositories/prisma/prisma-profiles-repository';
import { UpdateProfileUseCase } from '@/use-cases/profile/update-profile';

export function makeUpdateProfileUseCase() {
    const profileRepository = new PrismaProfilesRepository();
    const updateProfileUseCase = new UpdateProfileUseCase(profileRepository);

    return updateProfileUseCase;
}
