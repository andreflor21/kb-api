import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { randomUUID } from 'crypto';
import { beforeEach, describe, expect, it } from 'vitest';
import { GetUserByIdUseCase } from './get-user-by-id';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserByIdUseCase;

describe('Get user by Id use case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new GetUserByIdUseCase(usersRepository);
    });

    it('should return an user if its found', async () => {
        const user = await usersRepository.createUser({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
            cpf: '12345678901',
            birthdate: new Date().toISOString(),
            code: '123456',
            profile: { connect: { id: randomUUID() } },
        });

        const response = await sut.execute({
            id: user.id,
        });

        expect(response.user).toEqual(user);
    });
    it('should return null when user is not found', async () => {
        const response = await sut.execute({
            id: randomUUID(),
        });

        expect(response).toEqual({ user: null });
    });

    it('should throw an error when email is not provided', async () => {
        await expect(sut.execute({ id: '' })).rejects.toThrow(
            'Id must be provided'
        );
    });
});
