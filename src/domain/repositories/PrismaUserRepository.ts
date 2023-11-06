import { PrismaClient } from '@prisma/client'
import { IUserRepository } from './IUserRepository'
import { User } from '../entities/User'
import { AuthService } from '../../app/services/AuthService'

class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async createUser(user: User): Promise<Omit<User, 'senha'>> {
    const authService = new AuthService(this, '')

    user.senha = await authService.hashPassword(user.senha)

    const createdUser = await this.prisma.usuarios.create({ data: user })
    return createdUser
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.prisma.usuarios.findUnique({ where: { id } })
    return user
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.usuarios.findUnique({
      where: { email },
    })
    return user
  }

  async getUsers(): Promise<Omit<User[], 'senha'>> {
    const users = await this.prisma.usuarios.findMany()

    return users
  }

  async updateUser(
    id: string,
    user: User
  ): Promise<Omit<User, 'senha'> | null> {
    const checkUser = await this.prisma.usuarios.findUnique({ where: { id } })
    if (checkUser) {
      const updateUser = await this.prisma.usuarios.update({
        where: { id },
        data: {
          email: user.email ? user.email : checkUser.email,
          nome: user.nome ? user.nome : checkUser.nome,
          cpf: user.cpf ? user.cpf : checkUser.cpf,
          dtNascimento: user.dtNascimento
            ? user.dtNascimento
            : checkUser.dtNascimento,
          ativo: user.ativo ? user.ativo : checkUser.ativo,
          perfilId: user.perfilId ? user.perfilId : checkUser.perfilId,
        },
      })

      return updateUser
    } else {
      return null
    }
  }
  async deleteUser(id: string): Promise<void> {
    const checkUser = await this.prisma.usuarios.findUnique({ where: { id } })
    if (checkUser) {
      await this.prisma.usuarios.delete({ where: { id } })
    }
  }

  async changePassword(id: string, password: string): Promise<void> {
    const checkUser = await this.prisma.usuarios.findUnique({ where: { id } })
    const authService = new AuthService(this, '')
    const hashedPassword = await authService.hashPassword(password)

    if (checkUser) {
      await this.prisma.usuarios.update({
        where: { id },
        data: { senha: hashedPassword },
      })
    }
  }

  async recoverPassword(token: string, password: string): Promise<void> {
    const checkUser = await this.prisma.usuarios.findFirst({
      where: { tokenReset: token },
    })
    const authService = new AuthService(this, '')
    const hashedPassword = await authService.hashPassword(password)

    if (checkUser) {
      await this.prisma.usuarios.update({
        where: { id: checkUser.id },
        data: { senha: hashedPassword },
      })
    }
  }
  // Implemente outros métodos de acesso ao banco aqui
}

export { PrismaUserRepository }
