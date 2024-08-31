import { Profile, Prisma, User, Routes } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { ProfilesRepository } from '../profiles-repository';
import { ProfileExtended } from '@/@Types/profileExtended';
export class PrismaProfilesRepository implements ProfilesRepository {
    public async createProfile(
        data: Prisma.ProfileCreateInput
    ): Promise<ProfileExtended> {
        return await prisma.profile.create({
            data,
            include: {
                routes: true,
                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }

    public async getProfileById(id: string): Promise<ProfileExtended | null> {
        return await prisma.profile.findUnique({
            where: { id },
            include: {
                routes: true,
                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }

    public async getProfileByDescription(
        description: string
    ): Promise<ProfileExtended | null> {
        return await prisma.profile.findFirst({
            where: { description },
            include: {
                routes: true,
                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }

    public async getProfiles(): Promise<Profile[]> {
        return await prisma.profile.findMany({
            include: {
                routes: true,
                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }

    public async updateProfile(
        id: string,
        data: Prisma.ProfileUpdateInput
    ): Promise<ProfileExtended | null> {
        return await prisma.profile.update({
            where: { id },
            data,
            include: {
                routes: true,
                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }

    public async deleteProfile(id: string): Promise<void> {
        await prisma.profile.delete({ where: { id } });
    }

    public async duplicateProfile(
        id: string,
        description: string
    ): Promise<ProfileExtended | null> {
        const originProfile = await this.getProfileById(id);

        if (originProfile) {
            const originRoutes = originProfile.routes.map((route) => {
                return { id: route.id };
            });
            if (originRoutes.length > 0) {
                const newProfile = await this.createProfile({
                    description,
                    routes: {
                        connect: originRoutes,
                    },
                });
                return newProfile;
            } else {
                const newProfile = await this.createProfile({
                    description,
                });
                return newProfile;
            }
        } else {
            return null;
        }
    }

    public async linkProfileToRoute(
        id: string,
        routeId: string
    ): Promise<void> {
        await prisma.profile.update({
            where: { id },
            data: {
                routes: {
                    connect: { id: routeId },
                },
            },
        });
    }

    public async unlinkProfileToRoute(
        id: string,
        routeId: string
    ): Promise<void> {
        await prisma.profile.update({
            where: { id },
            data: {
                routes: {
                    disconnect: { id: routeId },
                },
            },
        });
    }
    // Adicione outros métodos necessários aqui
}
