import type { UsersRepository } from "@/repositories/users-repository"
import { UserNotFoundError } from "@/shared/errors/user-not-found-error"

interface UpdateTokenUseCaseRequest {
	id: string
	token: string
	date: Date
}

export class UpdateTokenUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		id,
		token,
		date,
	}: UpdateTokenUseCaseRequest): Promise<void> {
		const user = await this.usersRepository.getUserById(id)
		if (!user) {
			throw new UserNotFoundError()
		}
		await this.usersRepository.updateToken(id, token, date)
	}
}
