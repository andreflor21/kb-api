import { UsersRepository } from '@/repositories/users-repository';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';
import { hash } from 'bcryptjs';

interface RecoverPasswordUseCaseRequest {
    token: string;
    password: string;
}

export class RecoverPasswordUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        token,
        password,
    }: RecoverPasswordUseCaseRequest): Promise<void> {
        await this.usersRepository.recoverPassword(token, password);
    }
}
