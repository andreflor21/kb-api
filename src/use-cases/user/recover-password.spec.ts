import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { randomUUID } from 'crypto';
import { beforeEach, describe, expect, it } from 'vitest';
import { RecoverPasswordUseCase } from './recover-password';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';
import { hash } from 'bcryptjs';
import { ExpiredTokenError } from '@/shared/errors/expired-token-error';

let usersRepository: InMemoryUsersRepository;
let sut: RecoverPasswordUseCase;

describe('Update token use case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new RecoverPasswordUseCase(usersRepository);
    });

    it('should recover the password of a existing user', async () => {
        const { id, password } = await usersRepository.createUser({
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
        await usersRepository.updateToken(id, token, date);
        await sut.execute({ token, password: 'newPassword' });
        expect(await hash('newPassword', 8)).not.toEqual(password);
    });

    it('should throw UserNotFoundError if user does not exist', async () => {
        await expect(
            sut.execute({ token: randomUUID(), password: 'newPassword' })
        ).rejects.toThrow(UserNotFoundError);
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
        date.setHours(date.getHours() - 1);
        await usersRepository.updateToken(id, token, date);

        await expect(
            sut.execute({ token, password: 'newPassword' })
        ).rejects.toThrow(ExpiredTokenError);
    });
});
