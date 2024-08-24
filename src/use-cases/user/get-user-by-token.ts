import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';

interface GetUserByTokenUseCaseRequest {
    token: string;
}

interface GetUserByTokenUseCaseResponse {
    user: Omit<User, 'password'> | null;
}

export class GetUserByTokenUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        token,
    }: GetUserByTokenUseCaseRequest): Promise<GetUserByTokenUseCaseResponse> {
        const user = await this.usersRepository.getUserByToken(token);

        return { user };
    }
}
