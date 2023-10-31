import { PrismaClient } from '@prisma/client';
import { IUserRepository } from './IUserRepository';
import { User } from '../entities/User';
import { AuthService } from '../../app/services/AuthService';

class PrismaUserRepository implements IUserRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createUser(user: User): Promise<User> {
        const authService = new AuthService(this, '');

        user.senha = await authService.hashPassword(user.senha);

        const createdUser = await this.prisma.usuarios.create({ data: user });
        return createdUser;
    }

    async getUserById(id: string): Promise<User | null> {
        const user = await this.prisma.usuarios.findUnique({ where: { id } });
        return user;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.usuarios.findUnique({
            where: { email },
        });
        return user;
    }
    // Implemente outros métodos de acesso ao banco aqui
}

export { PrismaUserRepository };
