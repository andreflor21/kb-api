import { PrismaProfilesRepository } from "@/repositories/prisma/prisma-profiles-repository"
import { CreateProfileUseCase } from "../../profile/create-profile"

export function makeCreateProfileUseCase() {
	const profileRepository = new PrismaProfilesRepository()
	const createProfileUseCase = new CreateProfileUseCase(profileRepository)

	return createProfileUseCase
}
