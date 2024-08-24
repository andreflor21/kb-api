import { UsersRepository } from '@/repositories/users-repository';
import { InvalidCredentialsError } from '@/shared/errors/invalid-credentcials-error';
import { User } from '@prisma/client';
import { compare } from 'bcryptjs';

interface AuthenticateUseCaseRequest {
    email: string;
    password: string;
}

interface AuthenticateUseCaseResponse {
    user: User;
}

export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute(
        data: AuthenticateUseCaseRequest
    ): Promise<AuthenticateUseCaseResponse> {
        const user = await this.usersRepository.getUserByEmail(data.email);
        if (!user) {
            throw new InvalidCredentialsError();
        }

        const passwordMatch = await compare(data.password, user.password);
        if (!passwordMatch) {
            throw new InvalidCredentialsError();
        }

        return { user };
    }
}
