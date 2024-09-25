import { PrismaProfilesRepository } from "@/repositories/prisma/prisma-profiles-repository"
import { DeleteProfileUseCase } from "@/use-cases/profile/delete-profile"

export function makeDeleteProfileUseCase() {
	const profileRepository = new PrismaProfilesRepository()
	const deleteProfileUseCase = new DeleteProfileUseCase(profileRepository)

	return deleteProfileUseCase
}
