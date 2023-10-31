import { User } from '@entities/User';

export interface IUserRepository {
    createUser(user: User): Promise<User>;
    getUserById(id: string): Promise<User | null>;
    getUserByEmail(email: string): Promise<User | null>;
    // Adicione outros métodos necessários aqui
}
