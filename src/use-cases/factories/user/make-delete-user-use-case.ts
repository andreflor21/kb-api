import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { DeleteUserUseCase } from "../../user/delete-user"

export function makeDeleteUserUseCase() {
	const userRepository = new PrismaUsersRepository()
	const deleteUserUseCase = new DeleteUserUseCase(userRepository)

	return deleteUserUseCase
}
