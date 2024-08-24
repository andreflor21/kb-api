import { ChangePasswordUseCase } from './change-password';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';
import { hash } from 'bcryptjs';
import { randomUUID } from 'crypto';
import { beforeEach, describe, expect, it } from 'vitest';

describe('Change Password Use Case', () => {
    let usersRepository: InMemoryUsersRepository;
    let sut: ChangePasswordUseCase;

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new ChangePasswordUseCase(usersRepository);
    });

    it('should change the password of an existing user', async () => {
        const user = await usersRepository.createUser({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
            cpf: '12345678901',
            birthdate: new Date().toISOString(),
            code: '123456',
            profile: { connect: { id: randomUUID() } },
        });

        await sut.execute({
            id: user.id,
            password: 'newPassword',
        });

        const updatedUser = usersRepository.getUserById(user.id);
        expect(updatedUser).toBeDefined();
        expect(await hash('newPassword', 8)).not.toEqual(user.password);
    });

    it('should throw UserNotFoundError if user does not exist', async () => {
        await expect(
            sut.execute({ id: randomUUID(), password: 'newPassword' })
        ).rejects.toThrow(UserNotFoundError);
    });
});
