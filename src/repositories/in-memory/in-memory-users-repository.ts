import { UsersRepository } from '../users-repository';
import { User, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { hash } from 'bcryptjs';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';
import AppError from '@/shared/errors/app-error';
import { ExpiredTokenError } from '@/shared/errors/expired-token-error';

class InMemoryUsersRepository implements UsersRepository {
    private users: User[] = [];

    public async updateUser(
        id: string,
        data: Prisma.UserUpdateInput
    ): Promise<User | null> {
        const findUser = this.users.find((user) => user.id === id);

        if (findUser) {
            const updatedUser = {
                name: (data.name as string) ?? findUser.name,
                email: (data.email as string) ?? findUser.email,
                birthdate: (data.birthdate as Date) ?? findUser.birthdate,
                cpf: (data.cpf as string) ?? findUser.cpf,
                code: (data.code as string) ?? findUser.code,
                active: (data.active as boolean) ?? findUser.active,
                profileId: data.profile
                    ? (data.profile.connect?.id as string)
                    : findUser.profileId,
                changePassword: findUser.changePassword,
                createdAt: findUser.createdAt,
                id: findUser.id,
                password: findUser.password,
                tokenReset: findUser.tokenReset,
                tokenResetExpires: findUser.tokenResetExpires,
            };

            this.users[this.users.map((x) => x.id).indexOf(id)] = updatedUser;

            const { password, ...userWithoutPassword } = updatedUser;
            return updatedUser;
        } else {
            return null;
        }
    }

    public async createUser(data: Prisma.UserCreateInput): Promise<User> {
        const hashedPassword = await hash(data.password, 10);

        const newUser: User = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password: hashedPassword,
            cpf: data.cpf ?? null,
            code: data.code ?? null,
            birthdate: data.birthdate ? new Date(data.birthdate) : null,
            changePassword: false,
            active: true,
            tokenReset: null,
            tokenResetExpires: null,
            createdAt: new Date(),
            profileId: (data.profile.connect?.id as string) ?? randomUUID(),
        };

        this.users.push(newUser);

        const { password, ...userWithoutPassword } = newUser;
        return newUser;
    }

    public async recoverPassword(
        token: string,
        password: string
    ): Promise<void> {
        const findUser = this.users.find((user) => user.tokenReset === token);

        if (findUser) {
            const now = new Date();
            const expires = new Date(
                findUser.tokenResetExpires ? findUser.tokenResetExpires : ''
            );
            if (now > expires) throw new ExpiredTokenError();

            findUser.password = await hash(password, 10);
            findUser.tokenReset = null;
            findUser.tokenResetExpires = null;
            findUser.changePassword = false;

            this.users[this.users.map((x) => x.id).indexOf(findUser.id)] =
                findUser;
        } else {
            throw new UserNotFoundError();
        }
    }

    public async changePassword(id: string, password: string): Promise<void> {
        const findUser = this.users.find((user) => user.id === id);

        if (findUser) {
            findUser.password = await hash(password, 10);
            this.users[this.users.map((x) => x.id).indexOf(id)] = findUser;
        } else {
            throw new UserNotFoundError();
        }
    }

    public async updateToken(
        id: string,
        token: string,
        date: Date
    ): Promise<void> {
        const findUser = this.users.find((user) => user.id === id);

        if (findUser) {
            findUser.tokenReset = token;
            findUser.tokenResetExpires = date;
            findUser.changePassword = true;

            this.users[this.users.map((x) => x.id).indexOf(id)] = findUser;
        } else {
            throw new UserNotFoundError();
        }
    }

    public async deleteUser(id: string): Promise<void> {
        if (!this.users.find((user) => user.id === id)) {
            throw new UserNotFoundError();
        }
        this.users = this.users.filter((user) => user.id !== id);
    }

    public async getUsers(): Promise<User[]> {
        return this.users;
    }

    public async getUserById(id: string): Promise<User | null> {
        if (!id) throw new AppError('Id must be provided', 400);
        const findUser = this.users.find((user) => user.id === id);

        if (findUser) {
            const { password, ...userWithoutPassword } = findUser;
            return findUser;
        }

        return null;
    }
    public async getUserByToken(token: string): Promise<User | null> {
        if (!token) throw new AppError('Token must be provided', 400);
        const findUser = this.users.find((user) => user.tokenReset === token);

        if (findUser) {
            const { password, ...userWithoutPassword } = findUser;
            return findUser;
        }

        return null;
    }

    public async getUserByEmail(email: string): Promise<User | null> {
        if (!email) throw new AppError('Email must be provided', 400);

        const findUser = this.users.find((user) => user.email === email);
        if (findUser) {
            const { password, ...userWithoutPassword } = findUser;
            return findUser;
        }

        return null;
    }
}

export { InMemoryUsersRepository };