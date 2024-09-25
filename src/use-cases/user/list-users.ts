import type { UserExtended } from "@/types/user-extended"
import type { UsersRepository } from "@/repositories/users-repository"

interface ListUsersUseCaseResponse {
	users: Omit<UserExtended, "hashedPassword">[]
}

export class ListUsersUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute(): Promise<ListUsersUseCaseResponse> {
		const users = await this.usersRepository.getUsers()
		if (!users) {
			return { users: [] }
		}
		const usersSerialized = users.map((user) => {
			return { ...user, hashedPassword: undefined, profileId: undefined }
		})
		return { users: usersSerialized }
	}
}
