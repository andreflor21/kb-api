import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { GetUserByEmailUseCase } from "../../user/get-user-by-email"

export function makeGetUserByEmailUseCase() {
	const userRepository = new PrismaUsersRepository()
	const getUserByEmailUseCase = new GetUserByEmailUseCase(userRepository)

	return getUserByEmailUseCase
}
