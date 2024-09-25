import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { GetUserByIdUseCase } from "../../user/get-user-by-id"

export function makeGetUserByIdUseCase() {
	const userRepository = new PrismaUsersRepository()
	const getUserByIdUseCase = new GetUserByIdUseCase(userRepository)

	return getUserByIdUseCase
}
