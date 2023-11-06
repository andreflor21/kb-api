import { User } from '@entities/User'

export interface IUserRepository {
  createUser(user: User): Promise<Omit<User, 'senha'>>
  getUserById(id: string): Promise<Omit<User, 'senha'> | null>
  getUserByEmail(email: string): Promise<Omit<User, 'senha'> | null>
  getUsers(): Promise<Omit<User[], 'senha'>>
  updateUser(id: string, user: User): Promise<Omit<User, 'senha'> | null>
  deleteUser(id: string): Promise<void>
  changePassword(id: string, password: string): Promise<void>
  recoverPassword(token: string, password: string): Promise<void>
  // Adicione outros métodos necessários aqui
}
