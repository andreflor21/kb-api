import { randomUUID } from "node:crypto"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { UserAlreadyExistsError } from "@/shared/errors/user-already-exists-error"
import { CreateUserUseCase } from "@/use-cases/user/create-user"
import { beforeEach, describe, expect, it } from "vitest"

let usersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe("Create User Use Case", () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new CreateUserUseCase(usersRepository)
	})

	it("should be able to create a new user", async () => {
		await sut.execute({
			name: "John Doe",
			email: "johndoe@example.com",
			password: "123456",
			cpf: "12345678901",
			birthdate: new Date().toISOString(),
			code: "123456",
			profileId: randomUUID(),
		})

		const user = await usersRepository.getUserByEmail("johndoe@example.com")

		expect(user).not.toBeNull()
	})

	it("should not be able to create a user with the same email", async () => {
		await sut.execute({
			name: "John Doe",
			email: "johndoe@example.com",
			password: "123456",
			cpf: "12345678901",
			birthdate: new Date().toISOString(),
			code: "123456",
			profileId: randomUUID(),
		})
		await expect(() =>
			sut.execute({
				name: "John Doe 2",
				email: "johndoe@example.com",
				password: "123456",
				cpf: "12345678901",
				birthdate: new Date().toISOString(),
				code: "123456",
				profileId: randomUUID(),
			}),
		).rejects.toBeInstanceOf(UserAlreadyExistsError)
	})

	it("should not show password property in the response", async () => {
		const { user } = await sut.execute({
			name: "John Doe",
			email: "johndoe@example.com",
			password: "123456",
			cpf: "12345678901",
			birthdate: new Date().toISOString(),
			code: "123456",
			profileId: randomUUID(),
		})

		expect(user.hashedPassword).toBeUndefined()
	})
})
