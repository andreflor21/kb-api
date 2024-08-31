import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';

interface GetUserByEmailUseCaseRequest {
    email: string;
}

interface GetUserByEmailUseCaseResponse {
    user: Omit<User, 'hashedPassword'> | null;
}

export class GetUserByEmailUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        email,
    }: GetUserByEmailUseCaseRequest): Promise<GetUserByEmailUseCaseResponse> {
        const user = await this.usersRepository.getUserByEmail(email);
        if (!user) {
            return { user: null };
        }
        const { hashedPassword, ...userWithoutPassword } = user;
        return { user: userWithoutPassword };
    }
}
