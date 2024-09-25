import type { ProfilesRepository } from "@/repositories/profiles-repository"
import { ProfileAlreadyExistsError } from "@/shared/errors/profile-already-exists-error"
import { ProfileNotFoundError } from "@/shared/errors/profile-not-found-error"
import type { ProfileExtended } from "@/types/profile-extended"

type UpdateProfileUseCaseRequest = {
	id: string
	description: string
	users: string[]
	routes: string[]
}

type UpdateProfileUseCaseResponse = {
	profile: Partial<ProfileExtended> | null
}

export class UpdateProfileUseCase {
	constructor(private profilesRepository: ProfilesRepository) {}

	async execute({
		id,
		description,
		users,
		routes,
	}: UpdateProfileUseCaseRequest): Promise<UpdateProfileUseCaseResponse> {
		const profileWithSameDescription =
			await this.profilesRepository.getProfileByDescription(description)
		const checkProfile = await this.profilesRepository.getProfileById(id)
		if (profileWithSameDescription) {
			throw new ProfileAlreadyExistsError()
		}
		if (!checkProfile) {
			throw new ProfileNotFoundError()
		}

		const profile = await this.profilesRepository.updateProfile(id, {
			id,
			description,
			users: { set: users.map((id) => ({ id })) },
			routes: { set: routes.map((id) => ({ id })) },
		})

		return { profile }
	}
}
