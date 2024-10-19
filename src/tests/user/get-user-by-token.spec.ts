import { randomUUID } from "node:crypto"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { GetUserByTokenUseCase } from "@/use-cases/user/get-user-by-token"
import { hash } from "bcryptjs"
import { beforeEach, describe, expect, it } from "vitest"

let usersRepository: InMemoryUsersRepository
let sut: GetUserByTokenUseCase

describe("Get user by Id use case", () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new GetUserByTokenUseCase(usersRepository)
	})

	it("should return an user if its found", async () => {
		const user = await usersRepository.createUser({
			name: "John Doe",
			email: "johndoe@example.com",
			hashedPassword: await hash("123456", 10),
			cpf: "12345678901",
			birthdate: new Date().toISOString(),
			code: "123456",
			profile: { connect: { id: randomUUID() } },
		})
		const token = randomUUID()
		const date = new Date()
		date.setHours(date.getHours() + 1)
		await usersRepository.updateToken(user.id, token, date)
		const response = await sut.execute({ token })

		expect(response.user?.tokenReset).toEqual(token)
	})
	it("should return null when user is not found", async () => {
		const response = await sut.execute({
			token: randomUUID(),
		})

		expect(response).toEqual({ user: null })
	})

	it("should throw an error when email is not provided", async () => {
		await expect(sut.execute({ token: "" })).rejects.toThrow(
			"Token must be provided",
		)
	})
})
