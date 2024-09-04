import { UsersRepository } from '@/repositories/users-repository';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';

export class DeleteUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute(id: string): Promise<void> {
        await this.usersRepository.deleteUser(id);
    }
}
