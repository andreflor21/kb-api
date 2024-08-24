import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';

interface GetUserByEmailUseCaseRequest {
    email: string;
}

interface GetUserByEmailUseCaseResponse {
    user: Omit<User, 'password'> | null;
}

export class GetUserByEmailUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        email,
    }: GetUserByEmailUseCaseRequest): Promise<GetUserByEmailUseCaseResponse | null> {
        const user = await this.usersRepository.getUserByEmail(email);

        return { user };
    }
}
