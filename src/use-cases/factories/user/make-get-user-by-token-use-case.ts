import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { GetUserByTokenUseCase } from "../../user/get-user-by-token"

export function makeGetUserByTokenUseCase() {
	const userRepository = new PrismaUsersRepository()
	const getUserByTokenUseCase = new GetUserByTokenUseCase(userRepository)

	return getUserByTokenUseCase
}
