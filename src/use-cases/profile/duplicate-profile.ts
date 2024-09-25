import type { ProfileExtended } from "@/types/profile-extended"
import type { ProfilesRepository } from "@/repositories/profiles-repository"
import { ProfileNotFoundError } from "@/shared/errors/profile-not-found-error"

export class DuplicateProfileUseCase {
	constructor(private profilesRepository: ProfilesRepository) {}

	async execute(
		profileId: string,
		description: string,
	): Promise<ProfileExtended | null> {
		const profile = await this.profilesRepository.getProfileById(profileId)
		if (!profile) {
			throw new ProfileNotFoundError()
		}
		return this.profilesRepository.duplicateProfile(profileId, description)
	}
}
