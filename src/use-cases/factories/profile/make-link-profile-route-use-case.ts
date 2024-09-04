import { PrismaProfilesRepository } from '@/repositories/prisma/prisma-profiles-repository';
import { LinkProfileToRouteUseCase } from '../../profile/link-profile-route';

export function makeLinkProfileToRouteUseCase() {
    const profileRepository = new PrismaProfilesRepository();
    const linkProfileToRouteUseCase = new LinkProfileToRouteUseCase(
        profileRepository
    );

    return linkProfileToRouteUseCase;
}
