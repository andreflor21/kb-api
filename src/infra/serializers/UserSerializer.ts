// src/infrastructure/serializers/userSerializer.ts
import { User } from '../../entities/User';

export function serializeUser(user: User): Partial<User> {
    // Crie uma cópia do objeto User sem a propriedade 'senha'
    const userWithoutPassword: Partial<User> = { ...user };
    delete userWithoutPassword.senha;
    return userWithoutPassword;
}
