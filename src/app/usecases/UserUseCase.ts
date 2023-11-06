import { IUserRepository } from '@repositories/IUserRepository'
import { User } from '../../domain/entities/User'
import AppError from '../../shared/errors/AppError'
class UserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async createUser(user: User) {
    // Valide os dados do usuário aqui, se necessário
    const checkUserExists = await this.userRepository.getUserByEmail(user.email)

    if (checkUserExists) {
      throw new AppError('Email already exists', 401)
    }
    return this.userRepository.createUser(user)
  }

  async getUserById(id: string) {
    return this.userRepository.getUserById(id)
  }

  async getUserByEmail(email: string) {
    return this.userRepository.getUserByEmail(email)
  }

  async getUsers() {
    return this.userRepository.getUsers()
  }

  async updateUser(id: string, user: User) {
    return this.userRepository.updateUser(id, user)
  }
  async deleteUser(id: string) {
    return this.userRepository.deleteUser(id)
  }
  async changePassword(id: string, password: string) {
    return this.userRepository.changePassword(id, password)
  }
  async recoverPassword(token: string, password: string) {
    return this.userRepository.recoverPassword(token, password)
  }
  // Implemente outros casos de uso aqui
}

export { UserUseCase }
