import { PrismaProfilesRepository } from "@/repositories/prisma/prisma-profiles-repository"
import { ListProfilesUseCase } from "../../profile/list-profiles"

export function makeListProfileUseCase() {
	const profileRepository = new PrismaProfilesRepository()
	const listProfilesUseCase = new ListProfilesUseCase(profileRepository)

	return listProfilesUseCase
}
