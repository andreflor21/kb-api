import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { CreateUserUseCase } from '../../user/create-user';

export function makeCreateUserUseCase() {
    const userRepository = new PrismaUsersRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);

    return createUserUseCase;
}
