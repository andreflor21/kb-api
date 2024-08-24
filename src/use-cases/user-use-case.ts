import { UsersRepository } from '../repositories/users-repository';
import { User } from '../entities/User';
import AppError from '../shared/errors/app-error';
class UserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async createUser(user: User) {
        // Valide os dados do usuário aqui, se necessário
        const checkUserExists = await this.userRepository.getUserByEmail(
            user.email
        );

        if (checkUserExists) {
            throw new AppError('Email already exists', 401);
        }
        return this.userRepository.createUser(user);
    }

    async getUserById(id: string) {
        return this.userRepository.getUserById(id);
    }

    async getUserByEmail(email: string) {
        return this.userRepository.getUserByEmail(email);
    }

    async getUserByToken(token: string) {
        return this.userRepository.getUserByToken(token);
    }
    async getUsers() {
        return this.userRepository.getUsers();
    }

    async updateUser(id: string, user: User) {
        return this.userRepository.updateUser(id, user);
    }
    async deleteUser(id: string) {
        return this.userRepository.deleteUser(id);
    }
    async changePassword(id: string, password: string) {
        return this.userRepository.changePassword(id, password);
    }
    async recoverPassword(token: string, password: string) {
        return this.userRepository.recoverPassword(token, password);
    }
    async updateToken(userId: string, token: string, date: Date) {
        return this.userRepository.updateToken(userId, token, date);
    }
    // Implemente outros casos de uso aqui
}

export { UserUseCase };
