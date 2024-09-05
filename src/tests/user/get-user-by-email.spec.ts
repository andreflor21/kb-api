import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { GetUserByEmailUseCase } from '@/use-cases/user/get-user-by-email';
import { randomUUID } from 'crypto';
import { beforeEach, describe, expect, it } from 'vitest';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserByEmailUseCase;

describe('Get user by email use case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new GetUserByEmailUseCase(usersRepository);
    });

    it('should return null when user is not found', async () => {
        const response = await sut.execute({
            email: 'nonexistent@example.com',
        });

        expect(response).toEqual({ user: null });
    });

    it('should throw an error when email is not provided', async () => {
        await expect(sut.execute({ email: '' })).rejects.toThrow(
            'Email must be provided'
        );
    });
});
