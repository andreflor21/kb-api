import type { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"

interface RecoverPasswordUseCaseRequest {
	token: string
	password: string
}

export class RecoverPasswordUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		token,
		password,
	}: RecoverPasswordUseCaseRequest): Promise<void> {
		const hashedPassword = await hash(password, 10)
		await this.usersRepository.recoverPassword(token, hashedPassword)
	}
}
