import type { UsersRepository } from "@/repositories/users-repository"
import { InvalidCredentialsError } from "@/shared/errors/invalid-credentcials-error"
import type { UserExtended } from "@/types/user-extended"
import { compare } from "bcryptjs"

interface AuthenticateUseCaseRequest {
	email: string
	password: string
}

interface AuthenticateUseCaseResponse {
	user: UserExtended
}

export class AuthenticateUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute(
		data: AuthenticateUseCaseRequest,
	): Promise<AuthenticateUseCaseResponse> {
		const user = await this.usersRepository.getUserByEmail(data.email)
		if (!user) {
			throw new InvalidCredentialsError()
		}

		const passwordMatch = await compare(
			data.password,
			user.hashedPassword as string,
		)
		if (!passwordMatch) {
			throw new InvalidCredentialsError()
		}
		const { hashedPassword, profileId, ...userWithoutPassword } =
			structuredClone(user)
		return { user: userWithoutPassword }
	}
}
