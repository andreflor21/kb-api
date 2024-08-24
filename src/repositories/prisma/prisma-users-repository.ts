import { User, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { UsersRepository } from '../users-repository';
import { AuthService } from '../../http/services/AuthService';
import { hash } from 'bcryptjs';
class PrismaUsersRepository implements UsersRepository {
    async createUser(
        data: Prisma.UserCreateInput
    ): Promise<Omit<User, 'password'>> {
        data.password = await hash(data.password, 10);
        const user = await prisma.user.create({ data });
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async getUserById(id: string): Promise<Omit<User, 'password'> | null> {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        if (!user) return null;

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async getUserByToken(
        token: string
    ): Promise<Omit<User, 'password'> | null> {
        const user = await prisma.user.findFirst({
            where: { tokenReset: token },
        });
        if (!user) return null;

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async getUserByEmail(
        email: string
    ): Promise<Omit<User, 'password'> | null> {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) return null;

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async getUsers(): Promise<Omit<User, 'password'>[]> {
        const users = await prisma.user.findMany();

        return users.map(
            ({ password, ...userWithoutPassword }) => userWithoutPassword
        );
    }

    async updateUser(
        id: string,
        data: Prisma.UserUpdateInput
    ): Promise<Omit<User, 'password'> | null> {
        const user = await prisma.user.update({
            where: { id },
            data,
        });

        if (!user) return null;

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
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

        const hashedPassword = await hash(password, 10);

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
        const hashedPassword = await hash(password, 10);

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
