import type { UsersRepository } from "@/repositories/users-repository"
import type { UserExtended } from "@/types/user-extended"

type ListUsersUseCaseRequest = {
	skip: number
	take: number
}
interface ListUsersUseCaseResponse {
	users: Omit<UserExtended, "hashedPassword">[]
	totalUsers: number
}

export class ListUsersUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		skip,
		take,
	}: ListUsersUseCaseRequest): Promise<ListUsersUseCaseResponse> {
		const users = await this.usersRepository.getUsers(skip, take)
		const totalUsers = await this.usersRepository.countUsers()
		if (totalUsers === 0) {
			return { users: [], totalUsers }
		}
		const usersSerialized = users.map((user) => {
			return { ...user, hashedPassword: undefined, profileId: undefined }
		})
		return { users: usersSerialized, totalUsers }
	}
}
