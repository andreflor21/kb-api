import type { UsersRepository } from "@/repositories/users-repository"
import type { UserExtended } from "@/types/user-extended"

interface GetUserByIdUseCaseRequest {
	id: string
}

interface GetUserByIdUseCaseResponse {
	user: Omit<UserExtended, "hashedPassword"> | null
}

export class GetUserByIdUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		id,
	}: GetUserByIdUseCaseRequest): Promise<GetUserByIdUseCaseResponse> {
		const user = await this.usersRepository.getUserById(id)

		return { user }
	}
}
