import { PrismaProfilesRepository } from '@/repositories/prisma/prisma-profiles-repository';
import { DuplicateProfileUseCase } from '../../profile/duplicate-profile';

export function makeDuplicateProfileUseCase() {
    const profileRepository = new PrismaProfilesRepository();
    const duplicateProfileUseCase = new DuplicateProfileUseCase(
        profileRepository
    );

    return duplicateProfileUseCase;
}
