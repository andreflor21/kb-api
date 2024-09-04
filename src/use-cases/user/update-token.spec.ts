import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { randomUUID } from 'crypto';
import { beforeEach, describe, expect, it } from 'vitest';
import { UpdateTokenUseCase } from './update-token';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';

let usersRepository: InMemoryUsersRepository;
let sut: UpdateTokenUseCase;

describe('Update token use case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new UpdateTokenUseCase(usersRepository);
    });

    it('should update a existing user tokenReset field', async () => {
        const { id } = await usersRepository.createUser({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
            cpf: '12345678901',
            birthdate: new Date().toISOString(),
            code: '123456',
            profile: { connect: { id: randomUUID() } },
        });
        const token = randomUUID();
        const date = new Date();
        date.setHours(date.getHours() + 1);
        await sut.execute({ id, token, date });
        const response = await usersRepository.getUserByToken(token);

        expect(response?.tokenReset).toEqual(token);
    });
    it('should throw an error when user is not found', async () => {
        await expect(() =>
            sut.execute({
                id: randomUUID(),
                token: randomUUID(),
                date: new Date(),
            })
        ).rejects.toBeInstanceOf(UserNotFoundError);
    });

    it('should throw an error when the token is expired', async () => {
        const { id } = await usersRepository.createUser({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
            cpf: '12345678901',
            birthdate: new Date().toISOString(),
            code: '123456',
            profile: { connect: { id: randomUUID() } },
        });
        const token = randomUUID();
        const date = new Date();
        await sut.execute({ id, token, date });
    });
});
