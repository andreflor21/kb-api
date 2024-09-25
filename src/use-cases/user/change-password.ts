import type { UsersRepository } from "@/repositories/users-repository"
import { UserNotFoundError } from "@/shared/errors/user-not-found-error"
import { hash } from "bcryptjs"

interface ChangePasswordUseCaseRequest {
	id: string
	password: string
}

export class ChangePasswordUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		id,
		password,
	}: ChangePasswordUseCaseRequest): Promise<void> {
		const user = await this.usersRepository.getUserById(id)
		if (!user) {
			throw new UserNotFoundError()
		}
		const hashedPassword = await hash(password, 10)
		await this.usersRepository.changePassword(id, hashedPassword)
	}
}
