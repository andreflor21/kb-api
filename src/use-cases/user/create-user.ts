import { UsersRepository } from '@/repositories/users-repository';
import { UserAlreadyExistsError } from '@/shared/errors/user-already-exists-error';
import { User } from '@prisma/client';
import { hash } from 'bcryptjs';

interface CreateUserUseCaseRequest {
    name: string;
    email: string;
    pwd: string;
    cpf: string | null;
    birthdate: string | null;
    code: string | null;
    profileId: string;
}

interface CreateUserUseCaseResponse {
    user: Partial<User>;
}

export class CreateUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        name,
        email,
        pwd,
        cpf,
        birthdate,
        code,
        profileId,
    }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
        const userWithSameEmail = await this.usersRepository.getUserByEmail(
            email
        );
        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }

        const user = await this.usersRepository.createUser({
            name,
            email,
            password: await hash(pwd, 10),
            cpf,
            birthdate,
            code,
            profile: { connect: { id: profileId } },
        });

        const { password, ...userWithoutPassword } = user;
        return { user: userWithoutPassword };
    }
}
