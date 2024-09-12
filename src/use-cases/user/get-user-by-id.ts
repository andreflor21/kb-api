import { UserExtended } from '@/@Types/userExtended';
import { UsersRepository } from '@/repositories/users-repository';

interface GetUserByIdUseCaseRequest {
    id: string;
}

interface GetUserByIdUseCaseResponse {
    user: Omit<UserExtended, 'hashedPassword'> | null;
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
