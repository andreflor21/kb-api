import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';

interface ListUsersUseCaseResponse {
    users: Omit<User, 'password'>[];
}

export class ListUsersUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute(): Promise<ListUsersUseCaseResponse> {
        const users = await this.usersRepository.getUsers();

        return { users };
    }
}
