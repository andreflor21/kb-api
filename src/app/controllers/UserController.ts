import { Request, Response } from 'express'
import { User } from '@entities/User'
import { IUserRepository } from '@repositories/IUserRepository'

class UserController {
  constructor(private userRepository: IUserRepository) {}

  async createUser(req: Request, res: Response) {
    try {
      const user = req.body as User // Certifique-se de validar os dados de entrada

      const createdUser = await this.userRepository.createUser(user)
      res.status(201).json(createdUser)
    } catch (error) {
      console.log(error)

      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const user = await this.userRepository.getUserById(id)
      if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado' })
      } else {
        res.status(200).json(user)
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
  // Implemente outros métodos do controlador aqui
}

export { UserController }
