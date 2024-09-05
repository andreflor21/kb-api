import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { randomUUID } from 'crypto';
import { DeleteUserUseCase } from '@/use-cases/user/delete-user';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';
import { hash } from 'bcryptjs';

let usersRepository: InMemoryUsersRepository;
let sut: DeleteUserUseCase;

describe('Delete User Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new DeleteUserUseCase(usersRepository);
    });

    it('should be able to delete a user', async () => {
        const user = await usersRepository.createUser({
            name: 'John Doe',
            email: 'johndoe@example.com',
            hashedPassword: await hash('123456', 10),
            cpf: '12345678901',
            birthdate: new Date().toISOString(),
            code: '123456',
            profile: { connect: { id: randomUUID() } },
        });
        await sut.execute(user.id);
        const userFound = await usersRepository.getUserById(user.id);
        expect(userFound).toBeNull();
    });

    it('should throw an error of user not found', async () => {
        const userId = randomUUID();
        await expect(() => sut.execute(userId)).rejects.toBeInstanceOf(
            UserNotFoundError
        );
    });

    it('should not delete a user with invalid credentials', async () => {
        await usersRepository.createUser({
            name: 'Jane Doe',
            email: 'janedoe@example.com',
            hashedPassword: await hash('123456', 10),
            cpf: '12345678901',
            birthdate: new Date().toISOString(),
            code: '123456',
            profile: { connect: { id: randomUUID() } },
        });
        await expect(() => sut.execute(randomUUID())).rejects.toBeInstanceOf(
            UserNotFoundError
        );
    });

    it('should delete multiple users', async () => {
        const user1 = await usersRepository.createUser({
            name: 'User One',
            email: 'userone@example.com',
            hashedPassword: await hash('123456', 10),
            cpf: '12345678901',
            birthdate: new Date().toISOString(),
            code: '123456',
            profile: { connect: { id: randomUUID() } },
        });

        const user2 = await usersRepository.createUser({
            name: 'User Two',
            email: 'usertwo@example.com',
            hashedPassword: await hash('123456', 10),
            cpf: '12345678901',
            birthdate: new Date().toISOString(),
            code: '123456',
            profile: { connect: { id: randomUUID() } },
        });

        await sut.execute(user1.id);
        await sut.execute(user2.id);

        const user1Found = await usersRepository.getUserById(user1.id);
        const user2Found = await usersRepository.getUserById(user2.id);

        expect(user1Found).toBeNull();
        expect(user2Found).toBeNull();
    });
});
