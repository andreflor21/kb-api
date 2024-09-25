import type { ProfileExtended } from "@/types/profile-extended"
import type { ProfilesRepository } from "@/repositories/profiles-repository"

interface ListProfilesUseCaseResponse {
	profiles: ProfileExtended[]
}

export class ListProfilesUseCase {
	constructor(private profilesRepository: ProfilesRepository) {}

	async execute(): Promise<ListProfilesUseCaseResponse> {
		const profiles = await this.profilesRepository.getProfiles()
		return { profiles }
	}
}
