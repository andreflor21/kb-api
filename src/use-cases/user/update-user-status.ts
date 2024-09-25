import type { UsersRepository } from "@/repositories/users-repository"
import { UserNotFoundError } from "@/shared/errors/user-not-found-error"

interface UpdateUserStatusUseCaseRequest {
	id: string
	status: boolean
}

export class UpdateUserStatusUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		id,
		status,
	}: UpdateUserStatusUseCaseRequest): Promise<void> {
		const user = await this.usersRepository.getUserById(id)
		if (!user) {
			throw new UserNotFoundError()
		}

		await this.usersRepository.updateUserStatus(id, status)
	}
}
