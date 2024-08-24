import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { UpdateUserUseCase } from '../user/update-user';

export function makeUpdateUserUseCase() {
    const userRepository = new PrismaUsersRepository();
    const updateUserUseCase = new UpdateUserUseCase(userRepository);

    return updateUserUseCase;
}
