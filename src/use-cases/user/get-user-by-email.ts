import type { UsersRepository } from "@/repositories/users-repository"
import type { UserExtended } from "@/types/user-extended"

interface GetUserByEmailUseCaseRequest {
	email: string
}

interface GetUserByEmailUseCaseResponse {
	user: Omit<UserExtended, "hashedPassword"> | null
}

export class GetUserByEmailUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		email,
	}: GetUserByEmailUseCaseRequest): Promise<GetUserByEmailUseCaseResponse> {
		const user = await this.usersRepository.getUserByEmail(email)
		if (!user) {
			return { user: null }
		}
		const { hashedPassword, ...userWithoutPassword } = user
		return { user: userWithoutPassword }
	}
}
