import { PrismaProfilesRepository } from "@/repositories/prisma/prisma-profiles-repository"
import { GetProfileByIdUseCase } from "../../profile/get-profile-by-id"

export function makeGetUserByIdUseCase() {
	const profileRepository = new PrismaProfilesRepository()
	const getProfileByIdUseCase = new GetProfileByIdUseCase(profileRepository)

	return getProfileByIdUseCase
}
