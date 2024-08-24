import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';

interface GetUserByIdUseCaseRequest {
    id: string;
}

interface GetUserByIdUseCaseResponse {
    user: Omit<User, 'password'> | null;
}

export class GetUserByIdUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        id,
    }: GetUserByIdUseCaseRequest): Promise<GetUserByIdUseCaseResponse> {
        const user = await this.usersRepository.getUserById(id);

        return { user };
    }
}
