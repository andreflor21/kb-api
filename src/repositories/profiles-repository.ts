import { Prisma, Profile, User, Routes } from '@prisma/client';
import { ProfileExtended } from '@/@Types/profileExtended';
export interface ProfilesRepository {
    createProfile(data: Prisma.ProfileCreateInput): Promise<ProfileExtended>;
    getProfileById(id: string): Promise<ProfileExtended | null>;
    getProfileByDescription(
        description: string
    ): Promise<ProfileExtended | null>;
    getProfiles(): Promise<Profile[]>;
    updateProfile(
        id: string,
        data: Prisma.ProfileUpdateInput
    ): Promise<ProfileExtended | null>;
    deleteProfile(id: string): Promise<void>;
    duplicateProfile(
        id: string,
        description: string
    ): Promise<ProfileExtended | null>;
    linkProfileToRoute(id: string, routeId: string): Promise<void>;
    unlinkProfileToRoute(id: string, routeId: string): Promise<void>;
    // Adicione outros métodos necessários aqui
}
