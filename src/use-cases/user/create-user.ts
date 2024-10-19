import type { UsersRepository } from "@/repositories/users-repository"
import AppError from "@/shared/errors/app-error"
import { UserAlreadyExistsError } from "@/shared/errors/user-already-exists-error"
import { validateCpfCnpj } from "@/shared/utils/validate-cpf-cnpj"
import type { User } from "@prisma/client"
import { hash } from "bcryptjs"

interface CreateUserUseCaseRequest {
	name: string
	email: string
	password: string
	cpf: string | null
	birthdate: string | Date | null
	code: string | null
	profileId: string
	active?: boolean
}

interface CreateUserUseCaseResponse {
	user: Partial<User>
}

export class CreateUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		name,
		email,
		password,
		cpf,
		birthdate,
		code,
		profileId,
		active = false,
	}: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
		const userWithSameEmail =
			await this.usersRepository.getUserByEmail(email)
		if (userWithSameEmail) {
			throw new UserAlreadyExistsError()
		}
		if (cpf) {
			if (!validateCpfCnpj(cpf)) {
				throw new AppError("CPF inválido", 400)
			}
		}

		const user = await this.usersRepository.createUser({
			name,
			email,
			hashedPassword: await hash(password, 10),
			cpf,
			birthdate,
			code,
			profile: { connect: { id: profileId } },
			active,
		})

		const userCopy: Partial<User> = structuredClone(user)
		userCopy.hashedPassword = undefined

		return { user: userCopy }
	}
}
