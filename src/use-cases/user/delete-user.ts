import { UsersRepository } from '@/repositories/users-repository';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';

interface DeleteUserUseCaseRequest {
    id: string;
}

export class DeleteUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ id }: DeleteUserUseCaseRequest): Promise<void> {
        const userWithSameEmail = await this.usersRepository.getUserById(id);
        if (userWithSameEmail) {
            throw new UserNotFoundError();
        }

        await this.usersRepository.deleteUser(id);
    }
}
