import { randomUUID } from "node:crypto"
import type { ProfileExtended } from "@/types/profile-extended"
import type { Prisma } from "@prisma/client"
import type { ProfilesRepository } from "../profiles-repository"
export class InMemoryProfileRepository implements ProfilesRepository {
	private profiles: ProfileExtended[] = []

	public async deleteProfile(id: string): Promise<void> {
		this.profiles = this.profiles.filter((profile) => profile.id !== id)
	}

	public async getProfiles(): Promise<ProfileExtended[]> {
		return this.profiles
	}

	public async getProfileById(id: string): Promise<ProfileExtended | null> {
		const profile = this.profiles.find((profile) => profile.id === id)

		return profile ? profile : null
	}

	public async updateProfile(
		id: string,
		data: Prisma.ProfileUpdateInput,
	): Promise<ProfileExtended | null> {
		const findProfile = this.profiles.find((profile) => profile.id === id)

		if (findProfile) {
			findProfile.description =
				(data.description as string) ?? findProfile.description

			this.profiles[this.profiles.map((x) => x.id).indexOf(id)] =
				findProfile
			return findProfile
		}
		return null
	}

	public async createProfile(
		data: Prisma.ProfileCreateInput,
	): Promise<ProfileExtended> {
		const newProfile: ProfileExtended = {
			id: randomUUID(),
			description: data.description,
			routes: [],
			users: [],
		}

		this.profiles.push(newProfile)

		return newProfile
	}

	public async duplicateProfile(
		id: string,
		description: string,
	): Promise<ProfileExtended | null> {
		const originProfile = this.profiles.find((profile) => profile.id === id)

		if (originProfile) {
			const newProfile = this.createProfile({
				description,
				routes: {
					connect: originProfile.routes.map((route) => ({
						id: route.id,
					})),
				},
				users: {
					connect: originProfile.users.map((user) => ({
						id: user.id,
					})),
				},
			})

			return newProfile
		}
		return null
	}

	public async linkProfileToRoute(
		id: string,
		routeId: string,
	): Promise<void> {
		const profile = this.profiles.find((profile) => profile.id === id)

		if (profile) {
			profile.routes.push({ id: routeId })
		}
	}

	public async unlinkProfileToRoute(
		id: string,
		routeId: string,
	): Promise<void> {
		const profile = this.profiles.find((profile) => profile.id === id)

		if (profile) {
			profile.routes = profile.routes.filter(
				(route) => route.id !== routeId,
			)
		}
	}

	public async getProfileByDescription(
		description: string,
	): Promise<ProfileExtended | null> {
		const profile = this.profiles.find(
			(profile) => profile.description === description,
		)

		return profile ? profile : null
	}
}
