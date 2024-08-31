import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';

interface ListUsersUseCaseResponse {
    users: Omit<User, 'hashedPassword'>[];
}

export class ListUsersUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute(): Promise<ListUsersUseCaseResponse> {
        const users = await this.usersRepository.getUsers();
        if (!users) {
            return { users: [] };
        }
        return { users: users.map(({ hashedPassword, ...user }) => user) };
    }
}
