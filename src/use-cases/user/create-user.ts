import { UsersRepository } from '@/repositories/users-repository';
import { UserAlreadyExistsError } from '@/shared/errors/user-already-exists-error';
import { User } from '@prisma/client';
import { hash } from 'bcryptjs';

interface CreateUserUseCaseRequest {
    name: string;
    email: string;
    password: string;
    cpf: string | null;
    birthdate: string | Date | null;
    code: string | null;
    profileId: string;
    active?: boolean;
}

interface CreateUserUseCaseResponse {
    user: Partial<User>;
}

export class CreateUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        name,
        email,
        password,
        cpf,
        birthdate,
        code,
        profileId,
        active = false,
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
            hashedPassword: await hash(password, 10),
            cpf,
            birthdate,
            code,
            profile: { connect: { id: profileId } },
            active,
        });

        const userCopy: Partial<User> = structuredClone(user);
        delete userCopy.hashedPassword;

        return { user: userCopy };
    }
}
