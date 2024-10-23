import type { ProfilesRepository } from "@/repositories/profiles-repository"
import type { ProfileExtended } from "@/types/profile-extended"

type ListProfilesUseCaseRequest = {
	skip: number
	take: number
}
type ListProfilesUseCaseResponse = {
	profiles: ProfileExtended[]
	totalProfiles: number
}

export class ListProfilesUseCase {
	constructor(private profilesRepository: ProfilesRepository) {}

	async execute({
		skip,
		take,
	}: ListProfilesUseCaseRequest): Promise<ListProfilesUseCaseResponse> {
		const profiles = await this.profilesRepository.getProfiles(skip, take)
		const totalProfiles = await this.profilesRepository.countProfiles()
		return { profiles, totalProfiles }
	}
}
