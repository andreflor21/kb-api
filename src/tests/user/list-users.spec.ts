import { ListUsersUseCase } from '@/use-cases/user/list-users';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { randomUUID } from 'crypto';
import { beforeEach, describe, expect, it } from 'vitest';
import { hash } from 'bcryptjs';

describe('ListUsersUseCase', () => {
    let usersRepository: InMemoryUsersRepository;
    let listUsersUseCase: ListUsersUseCase;

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        listUsersUseCase = new ListUsersUseCase(usersRepository);
    });

    it('should return a list of users', async () => {
        for (let i = 0; i < 10; i++) {
            await usersRepository.createUser({
                name: `User ${i}`,
                email: `email${i}@example.com`,
                hashedPassword: await hash(
                    Math.random().toString(36).substring(7),
                    10
                ),
                cpf: Math.random().toString(36).substring(11),
                birthdate: new Date().toISOString(),
                code: Math.random().toString(36).substring(6),
                profile: { connect: { id: randomUUID() } },
            });
        }

        const result = await listUsersUseCase.execute();

        expect(result.users).toBeTypeOf('object');
        expect(result.users.length).toEqual(10);
    });
});
