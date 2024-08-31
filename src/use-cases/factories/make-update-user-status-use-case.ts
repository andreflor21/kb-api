import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { UpdateUserStatusUseCase } from '../user/update-user-status';

export function makeUpdateUserStatusUseCase() {
    const userRepository = new PrismaUsersRepository();
    const updateUserStatusUseCase = new UpdateUserStatusUseCase(userRepository);

    return updateUserStatusUseCase;
}
