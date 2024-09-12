import { User, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { UsersRepository } from '../users-repository';
import { ExpiredTokenError } from '@/shared/errors/expired-token-error';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';
import { UserExtended } from '@/@Types/userExtended';

class PrismaUsersRepository implements UsersRepository {
    async createUser(data: Prisma.UserCreateInput): Promise<UserExtended> {
        const user = await prisma.user.create({
            data,
            select: {
                id: true,
                name: true,
                email: true,
                cpf: true,
                birthdate: true,
                code: true,
                profileId: true,
                active: true,
            },
        });
        return user;
    }

    async getUserById(id: string): Promise<UserExtended | null> {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                cpf: true,
                birthdate: true,
                code: true,
                profileId: true,
                active: true,
            },
        });
        if (!user) return null;

        return user;
    }

    async getUserByToken(token: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: { tokenReset: token },
        });
        if (!user) return null;

        return user;
    }

    async getUserByEmail(email: string): Promise<UserExtended | null> {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                profile: {
                    select: {
                        id: true,
                        description: true,
                        routes: {
                            select: {
                                id: true,
                                path: true,
                                method: true,
                                description: true,
                            },
                        },
                    },
                },
            },
        });
        if (!user) return null;

        return user;
    }

    async getUsers(): Promise<User[]> {
        const users = await prisma.user.findMany();

        return users;
    }

    async updateUser(
        id: string,
        data: Prisma.UserUpdateInput
    ): Promise<UserExtended | null> {
        const user = await prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                name: true,
                email: true,
                cpf: true,
                birthdate: true,
                code: true,
                profileId: true,
                active: true,
            },
        });

        if (!user) return null;

        return user;
    }

    async deleteUser(id: string): Promise<void> {
        const checkUser = await prisma.user.findUnique({
            where: { id },
        });
        if (checkUser) {
            await prisma.user.delete({ where: { id } });
        } else {
            throw new UserNotFoundError();
        }
    }

    async changePassword(id: string, hashedPassword: string): Promise<void> {
        const checkUser = await prisma.user.findUnique({
            where: { id },
        });

        if (checkUser) {
            await prisma.user.update({
                where: { id },
                data: { hashedPassword },
            });
        } else {
            throw new UserNotFoundError();
        }
    }

    async recoverPassword(
        token: string,
        hashedPassword: string
    ): Promise<void> {
        const checkUser = await prisma.user.findFirst({
            where: { tokenReset: token },
        });

        if (checkUser) {
            const now = new Date();
            const expires = new Date(
                checkUser.tokenResetExpires ? checkUser.tokenResetExpires : ''
            );
            if (now > expires) throw new ExpiredTokenError();

            await prisma.user.update({
                where: { id: checkUser.id },
                data: {
                    hashedPassword,
                    tokenReset: null,
                    tokenResetExpires: null,
                    changePassword: false,
                },
            });
        } else {
            throw new UserNotFoundError();
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
        } else {
            throw new UserNotFoundError();
        }
    }
    // Implemente outros métodos de acesso ao banco aqui
    async updateUserStatus(id: string, status: boolean): Promise<void> {
        const checkUser = await prisma.user.findUnique({
            where: { id },
        });

        if (checkUser) {
            await prisma.user.update({
                where: { id },
                data: { active: status },
            });
        } else {
            throw new UserNotFoundError();
        }
    }
}

export { PrismaUsersRepository };
