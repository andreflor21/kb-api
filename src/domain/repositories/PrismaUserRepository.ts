import { PrismaClient } from '@prisma/client';
import { IUserRepository } from './IUserRepository';
import { User } from '../entities/User';

export class PrismaUserRepository implements IUserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async createUser(user: User): Promise<User> {
        return this.prisma.user.create({ data: user });
    }

    async getUserById(id: number): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }
    // Implemente outros métodos de acesso ao banco aqui
}
