import { IUserRepository } from '@repositories/IUserRepository';

class UserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async createUser(user: any) {
        // Valide os dados do usuário aqui, se necessário
        return this.userRepository.createUser(user);
    }

    async getUserById(id: number) {
        return this.userRepository.getUserById(id);
    }

    async getUserByEmail(email: string) {
        return this.userRepository.getUserByEmail(email);
    }

    // Implemente outros casos de uso aqui
}

export { UserUseCase };
