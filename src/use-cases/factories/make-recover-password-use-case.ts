import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { RecoverPasswordUseCase } from '../user/recover-password';

export function makeRecoverPasswordUseCase() {
    const userRepository = new PrismaUsersRepository();
    const recoverPasswordUseCase = new RecoverPasswordUseCase(userRepository);

    return recoverPasswordUseCase;
}
