import { User } from '../entities/User'

export interface IUserRepository {
  createUser(user: User): Promise<User>
  getUserById(id: string): Promise<User | null>
  getUserByEmail(email: string): Promise<User | null>
  getUserByToken(token: string): Promise<User | null>
  getUsers(): Promise<User[]>
  updateUser(id: string, user: User): Promise<User | null>
  deleteUser(id: string): Promise<void>
  changePassword(id: string, password: string): Promise<void>
  recoverPassword(token: string, password: string): Promise<void>
  updateToken(userId: string, token: string, date: Date): Promise<void>
  // Adicione outros métodos necessários aqui
}
