import { User, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { UsersRepository } from '../users-repository';
import { AuthService } from '../../http/services/AuthService';
class PrismaUsersRepository implements UsersRepository {
    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        const user = await prisma.user.create({ data });
        return user;
    }

    async getUserById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { id } });
        if (user) return user;
        else return null;
    }

    async getUserByToken(token: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: { tokenReset: token },
        });
        if (user) return user;
        else return null;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (user) return user;
        else return null;
    }

    async getUsers(): Promise<User[]> {
        const users = await prisma.user.findMany();

        return users;
    }

    async updateUser(
        id: string,
        data: Prisma.UserUpdateInput
    ): Promise<User | null> {
        const user = await prisma.user.update({
            where: { id },
            data,
        });

        return user;
    }
    async deleteUser(id: string): Promise<void> {
        const checkUser = await prisma.user.findUnique({
            where: { id },
        });
        if (checkUser) {
            await prisma.user.delete({ where: { id } });
        }
    }

    async changePassword(id: string, password: string): Promise<void> {
        const checkUser = await prisma.user.findUnique({
            where: { id },
        });
        const authService = new AuthService(this, '');
        const hashedPassword = await authService.hashPassword(password);

        if (checkUser) {
            await prisma.user.update({
                where: { id },
                data: { password: hashedPassword },
            });
        }
    }

    async recoverPassword(token: string, password: string): Promise<void> {
        const checkUser = await prisma.user.findFirst({
            where: { tokenReset: token },
        });
        const authService = new AuthService(this, '');
        const hashedPassword = await authService.hashPassword(password);

        if (checkUser) {
            await prisma.user.update({
                where: { id: checkUser.id },
                data: {
                    password: hashedPassword,
                    tokenReset: null,
                    tokenResetExpires: null,
                    changePassword: false,
                },
            });
        }
    }
    async updateToken(
        userId: string,
        token: string,
        date: Date
    ): Promise<void> {
        const checkUser = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (checkUser) {
            await prisma.user.update({
                where: { id: checkUser.id },
                data: {
                    tokenReset: token,
                    tokenResetExpires: date,
                    changePassword: true,
                },
            });
        }
    }
    // Implemente outros métodos de acesso ao banco aqui
}

export { PrismaUsersRepository };
