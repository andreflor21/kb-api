import { randomUUID } from "node:crypto"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { ExpiredTokenError } from "@/shared/errors/expired-token-error"
import { UserNotFoundError } from "@/shared/errors/user-not-found-error"
import { RecoverPasswordUseCase } from "@/use-cases/user/recover-password"
import { hash } from "bcryptjs"
import { beforeEach, describe, expect, it } from "vitest"

let usersRepository: InMemoryUsersRepository
let sut: RecoverPasswordUseCase

describe("Update token use case", () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new RecoverPasswordUseCase(usersRepository)
	})

	it("should recover the password of a existing user", async () => {
		const { id, hashedPassword } = await usersRepository.createUser({
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
		await usersRepository.updateToken(id, token, date)
		await sut.execute({ token, password: "newPassword" })
		expect(await hash("newPassword", 10)).not.toEqual(hashedPassword)
	})

	it("should throw UserNotFoundError if user does not exist", async () => {
		await expect(
			sut.execute({ token: randomUUID(), password: "newPassword" }),
		).rejects.toThrow(UserNotFoundError)
	})

	it("should throw an error when the token is expired", async () => {
		const { id } = await usersRepository.createUser({
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
		date.setHours(date.getHours() - 1)
		await usersRepository.updateToken(id, token, date)

		await expect(
			sut.execute({ token, password: "newPassword" }),
		).rejects.toThrow(ExpiredTokenError)
	})
})
