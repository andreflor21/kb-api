import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { GetUserByTokenUseCase } from '../../user/get-user-by-token';

export function makeGetUserByEmailUseCase() {
    const userRepository = new PrismaUsersRepository();
    const getUserByTokenUseCase = new GetUserByTokenUseCase(userRepository);

    return getUserByTokenUseCase;
}
