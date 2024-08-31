import { UsersRepository } from '@/repositories/users-repository';
import { UserAlreadyExistsError } from '@/shared/errors/user-already-exists-error';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';
import { User } from '@prisma/client';

interface UpdateUserUseCaseRequest {
    id: string;
    name?: string;
    email?: string;
    cpf?: string | null;
    birthdate?: Date | null;
    code?: string | null;
    profileId?: string;
}

interface UpdateUserUseCaseResponse {
    user: Omit<User, 'password'> | null;
}

export class UpdateUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        id,
        name,
        email,
        cpf,
        birthdate,
        code,
        profileId,
    }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
        const user = await this.usersRepository.getUserById(id);
        if (!user) {
            throw new UserNotFoundError();
        }
        if (email) {
            const userByEmail = await this.usersRepository.getUserByEmail(
                email
            );
            if (userByEmail && userByEmail.id !== user.id) {
                throw new UserAlreadyExistsError();
            }
        }

        const updatedUser = await this.usersRepository.updateUser(id, {
            id,
            name,
            email,
            cpf,
            birthdate,
            code,
            profile: { connect: { id: profileId } },
        });

        return { user: updatedUser };
    }
}
