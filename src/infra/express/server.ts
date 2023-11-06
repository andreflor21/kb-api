import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import { PrismaUserRepository } from '../../domain/repositories/PrismaUserRepository'
import { UserController } from '../../app/controllers/UserController'
import { UserUseCase } from '../../app/usecases/UserUseCase'
import { AuthService } from '../../app/services/AuthService'
import { PrismaClient } from '@prisma/client'

const app: Application = express()
app.use(bodyParser.json())

// Configure o PrismaClient
const prisma = new PrismaClient()

const userRepository = new PrismaUserRepository(prisma)
const userUseCase = new UserUseCase(userRepository)
const userController = new UserController(userUseCase)
const jwtSecret = process.env.JWT_SECRET || ''

const authService = new AuthService(userRepository, jwtSecret)

app.post('/users', userController.createUser.bind(userController))
app.get('/users/:id', userController.getUserById.bind(userController))

app.post('/login', async (req: Request, res: Response) => {
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
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
