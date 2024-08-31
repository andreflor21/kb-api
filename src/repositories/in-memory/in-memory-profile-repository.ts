import { ProfilesRepository } from '../profiles-repository';
import { Profile, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

class InMemoryProfileRepository implements ProfilesRepository {
    private profiles: Profile[] = [];

    public async deleteProfile(id: string): Promise<void> {
        this.profiles = this.profiles.filter((profile) => profile.id != id);
    }

    public async getProfiles(): Promise<Profile[]> {
        return this.profiles;
    }

    public async getProfileById(id: string): Promise<Profile | null> {
        const profile = this.profiles.find((profile) => profile.id == id);

        return profile ? profile : null;
    }

    public async updateProfile(
        id: string,
        data: Prisma.ProfileUpdateInput
    ): Promise<Profile | null> {
        const findProfile = this.profiles.find((profile) => profile.id == id);

        if (findProfile) {
            findProfile.description =
                (data.description as string) ?? findProfile.description;

            this.profiles[this.profiles.map((x) => x.id).indexOf(id)] =
                findProfile;
            return findProfile;
        } else {
            return null;
        }
    }

    public async createProfile(
        data: Prisma.ProfileCreateInput
    ): Promise<Profile> {
        const newProfile: Profile = {
            id: randomUUID(),
            description: data.description,
        };

        this.profiles.push(newProfile);

        return newProfile;
    }

    public async duplicateProfile(
        id: string,
        description: string
    ): Promise<Profile | null> {
        const originProfile = this.profiles.find((profile) => profile.id == id);

        if (originProfile) {
            originProfile.description = description;
            const newProfile = this.createProfile(originProfile);

            return newProfile;
        } else {
            return null;
        }
    }

    public async linkProfileToRoute(
        id: string,
        routeId: string
    ): Promise<void> {}

    public async unlinkProfileToRoute(
        id: string,
        routeId: string
    ): Promise<void> {}
}
