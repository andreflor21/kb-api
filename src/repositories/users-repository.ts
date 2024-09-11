import { Prisma, User } from '@prisma/client';
import { UserExtended } from '@/@Types/userExtended';
export interface UsersRepository {
    createUser(data: Prisma.UserCreateInput): Promise<User>;
    getUserById(id: string): Promise<User | null>;
    getUserByEmail(email: string): Promise<UserExtended | null>;
    getUserByToken(token: string): Promise<User | null>;
    getUsers(): Promise<User[]>;
    updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User | null>;
    deleteUser(id: string): Promise<void>;
    changePassword(id: string, hashedPassword: string): Promise<void>;
    recoverPassword(token: string, hashedPassword: string): Promise<void>;
    updateToken(userId: string, token: string, date: Date): Promise<void>;
    updateUserStatus(id: string, status: boolean): Promise<void>;
    // Adicione outros métodos necessários aqui
}
