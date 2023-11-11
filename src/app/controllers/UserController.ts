import { Request, Response } from 'express'
import { User } from '../../domain/entities/User'
import { IUserRepository } from '../../domain/repositories/IUserRepository'
import { serializeUser } from '../../infra/serializers/UserSerializer'
import AppError from '../../shared/errors/AppError'
import { AuthService } from '../services/AuthService'
import { sendMail } from '../../infra/email/SendEmail'
import path from 'path'

interface TemplateResetSenha {
  nome: string
  token: string
  url: string
}
class UserController {
  constructor(private userRepository: IUserRepository) {}

  async createUser(req: Request, res: Response) {
    try {
      const user = req.body as User // Certifique-se de validar os dados de entrada

      const createdUser = await this.userRepository.createUser(user)
      res.status(201).json(serializeUser(createdUser))
    } catch (error) {
      if (error instanceof AppError)
        res.status(error.statusCode).json({ error: error.message })
      else res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const user = await this.userRepository.getUserById(id)
      if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado' })
      } else {
        res.status(200).json(serializeUser(user))
      }
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message })
      } else res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await this.userRepository.getUsers()

      const serializedUsers = users.map((user) => serializeUser(user))
      res.status(200).json(serializedUsers)
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  async login(req: Request, res: Response) {
    const jwtSecret = process.env.JWT_SECRET
    const authService = new AuthService(this.userRepository, jwtSecret)
    const { email, senha } = req.body

    if (!email || !senha) {
      return res.status(400).json({ error: 'Informe o email e a senha.' })
    }

    const token = await authService.login(email, senha)

    if (token) {
      res.status(200).json({ token })
    } else {
      res.status(401).json({ error: 'Credenciais inválidas.' })
    }
  }

  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body
    try {
      const user = await this.userRepository.getUserByEmail(email)

      if (!user) throw new AppError('Usuário não encontrado', 404)

      const token = crypto.randomUUID()
      const now = new Date()
      now.setHours(now.getHours() + 1)

      if (user.id) await this.userRepository.updateToken(user.id, token, now)

      const templateData: TemplateResetSenha = {
        nome: user.nome,
        token,
        url: `http://localhost:5173/redefinir-senha/${token}`,
      }
      sendMail<TemplateResetSenha>({
        subject: 'Recuperação de Senha',
        templateData,
        templatePath: path.join('src', 'infra/email/forgotPasswordEmail.html'),
        to: email,
      })
      res.status(200).json({
        message: `E-mail enviado para ${email}`,
        token,
        expires: now,
      })
    } catch (err) {
      if (err instanceof AppError) res.status(err.statusCode).json(err)
    }
  }

  async recoverPassword(req: Request, res: Response) {
    const { token } = req.params
    const { senha } = req.body

    try {
      const user = await this.userRepository.getUserByToken(token)

      if (!user) throw new AppError('Usuário não encontrado', 404)
      else {
        const now = new Date()
        const expires = new Date(
          user.tokenResetExpires ? user.tokenResetExpires : ''
        )

        if (now > expires) throw new AppError('Token expirado', 400)

        await this.userRepository.recoverPassword(token, senha)

        res.status(200).json({ message: 'Senha atualizada!' })
      }
    } catch (err) {}
  }
  // Implemente outros métodos do controlador aqui
}

export { UserController }
