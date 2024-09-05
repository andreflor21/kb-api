import { UpdateUserUseCase } from '@/use-cases/user/update-user';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';
import { hash } from 'bcryptjs';
import { randomUUID } from 'crypto';
import { beforeEach, describe, expect, it } from 'vitest';
describe('UpdateUserUseCase', () => {
    let usersRepository: InMemoryUsersRepository;
    let updateUserUseCase: UpdateUserUseCase;

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        updateUserUseCase = new UpdateUserUseCase(usersRepository);
    });

    it('should update an existing user', async () => {
        const user = await usersRepository.createUser({
            name: `User 1`,
            email: `email1@example.com`,
            hashedPassword: await hash(
                Math.random().toString(36).substring(7),
                10
            ),
            cpf: Math.random().toString(36).substring(11),
            birthdate: new Date().toISOString(),
            code: Math.random().toString(36).substring(6),
            profile: { connect: { id: randomUUID() } },
        });

        await updateUserUseCase.execute({ id: user.id, name: 'Jane Doe' });

        const updatedUser = await usersRepository.getUserById(user.id);
        expect(updatedUser).toBeDefined();
        expect(updatedUser?.name).toBe('Jane Doe');
    });

    it('should throw UserNotFoundError if user does not exist', async () => {
        await expect(
            updateUserUseCase.execute({ id: '1', name: 'Jane Doe' })
        ).rejects.toThrow(UserNotFoundError);
    });
});
