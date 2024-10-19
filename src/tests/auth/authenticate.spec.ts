import { randomUUID } from "node:crypto"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { InvalidCredentialsError } from "@/shared/errors/invalid-credentcials-error"
import { AuthenticateUseCase } from "@/use-cases/auth/authenticate"
import { hash } from "bcryptjs"
import { beforeEach, describe, expect, it } from "vitest"

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe("Authenticate Use Case", () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new AuthenticateUseCase(usersRepository)
	})

	it("should be able to authenticate", async () => {
		await usersRepository.createUser({
			name: "John Doe",
			email: "johndoe@example.com",
			hashedPassword: await hash("123456", 10),
			cpf: "12345678901",
			birthdate: new Date().toISOString(),
			code: "123456",
			profile: {
				connect: { id: randomUUID() },
			},
		})

		const { user } = await sut.execute({
			email: "johndoe@example.com",
			password: "123456",
		})

		expect(user.id).toEqual(expect.any(String))
	})

	it("should not be able to authenticate with wrong email", async () => {
		await expect(() =>
			sut.execute({
				email: "johndoe@example.com",
				password: "123456",
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	it("should not be able to authenticate with wrong email", async () => {
		await usersRepository.createUser({
			name: "John Doe",
			email: "johndoe@example.com",
			hashedPassword: await hash("123456", 10),
			cpf: "12345678901",
			birthdate: new Date().toISOString(),
			code: "123456",
			profile: {
				connect: { id: randomUUID() },
			},
		})

		await expect(() =>
			sut.execute({
				email: "johndoe@example.com",
				password: "123123",
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})
