import { UserExtended } from '@/@Types/userExtended';
import { validateCpfCnpj } from '@/shared/utils/validate-cpf-cnpj';
import { UsersRepository } from '@/repositories/users-repository';
import AppError from '@/shared/errors/app-error';
import { UserAlreadyExistsError } from '@/shared/errors/user-already-exists-error';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';

interface UpdateUserUseCaseRequest {
    id: string;
    name?: string;
    email?: string;
    cpf?: string | null;
    hashedPassword?: string | null;
    birthdate?: Date | null;
    password?: string | null;
    code?: string | null;
    profileId?: string;
    active?: boolean;
}

interface UpdateUserUseCaseResponse {
    user: Omit<UserExtended, 'hashedPassword'> | null;
}

export class UpdateUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        id,
        name,
        email,
        cpf,
        birthdate,
        hashedPassword,
        code,
        profileId,
        active,
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
        if (cpf) {
            if (!validateCpfCnpj(cpf)) {
                throw new AppError('CPF inválido', 400);
            }
        }
        const updatedUser = await this.usersRepository.updateUser(id, {
            id,
            name: name ?? user.name,
            email: email ?? user.email,
            hashedPassword: hashedPassword ?? user.hashedPassword,
            cpf: cpf ?? user.cpf,
            birthdate: birthdate ?? user.birthdate,
            code: code ?? user.code,
            active: active ?? user.active,
            profile: { connect: { id: profileId ?? user.profileId } },
        });
        return { user: updatedUser };
    }
}
