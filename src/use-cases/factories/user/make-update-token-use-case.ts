import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { UpdateTokenUseCase } from '../../user/update-token';

export function makeUpdateTokenUseCase() {
    const userRepository = new PrismaUsersRepository();
    const updateTokenUseCase = new UpdateTokenUseCase(userRepository);

    return updateTokenUseCase;
}
