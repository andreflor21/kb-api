// src/application/services/AuthService.ts
import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { User } from '@entities/User'
import { IUserRepository } from '@repositories/IUserRepository'

export class AuthService {
  constructor(
    private userRepository: IUserRepository,
    private jwtSecret: string
  ) {}

  async login(email: string, senha: string): Promise<string | null> {
    const user: User | null = await this.userRepository.getUserByEmail(email)

    if (!user) {
      return null
    }

    const passwordMatch = await compare(senha, user.senha)

    if (!passwordMatch) {
      return null
    }

    const token = sign(
      { userId: user.id, profileId: user.perfilId },
      this.jwtSecret,
      {
        expiresIn: '1 day',
      }
    )
    return token
  }

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await hash(password, 10)
    return hashedPassword
  }
}
