import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { ChangePasswordUseCase } from '../user/change-password';

export function makeChangePasswordUserUseCase() {
    const userRepository = new PrismaUsersRepository();
    const changePasswordUseCase = new ChangePasswordUseCase(userRepository);

    return changePasswordUseCase;
}
