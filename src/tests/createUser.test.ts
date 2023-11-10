import AppError from '../shared/errors/AppError'
import { FakeUserRepository } from '../domain/repositories/FakeUserRepository'
import { expect, test } from 'vitest'
import { UserUseCase } from '../app/usecases/UserUseCase'
import { User } from '../domain/entities/User'
import { v4 as uuid } from 'uuid'
import { serializeUser } from '../infra/serializers/UserSerializer'

test('should be able to create a new user', async () => {
  const fakeUserRepository = new FakeUserRepository()

  const userUseCase = new UserUseCase(fakeUserRepository)
  const userData: User = {
    nome: 'John Doe',
    email: 'john@example.com',
    senha: '123456',
    perfilId: uuid(),
    dtCadastro: new Date().toISOString(),
  }

  const user = await userUseCase.createUser(userData)

  expect(user).toHaveProperty('id')
})
test('should not be able to create a new user with duplicated email', async () => {
  const fakeUserRepository = new FakeUserRepository()

  const userUseCase = new UserUseCase(fakeUserRepository)
  const userData: User = {
    nome: 'John Doe',
    email: 'john@example.com',
    senha: '123456',
    perfilId: uuid(),
    dtCadastro: new Date().toISOString(),
  }

  const user = await userUseCase.createUser(userData)

  expect(
    userUseCase.createUser({
      nome: 'John Doe',
      email: 'john@example.com',
      senha: '123456',
      perfilId: uuid(),
      dtCadastro: new Date().toISOString(),
    })
  ).rejects.toBeInstanceOf(AppError)
})
test('Shoud not return the passoword property', async () => {
  const fakeUserRepository = new FakeUserRepository()

  const userUseCase = new UserUseCase(fakeUserRepository)

  const userData: User = {
    nome: 'John Doe',
    email: 'john@example.com',
    senha: '123456',
    perfilId: uuid(),
    dtCadastro: new Date().toISOString(),
  }

  const user = await userUseCase.createUser(userData)

  const returnUser = await userUseCase.getUserByEmail(user.email)
  expect(serializeUser(returnUser).senha).toBeUndefined()
})
