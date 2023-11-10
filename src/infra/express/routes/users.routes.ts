// src/infrastructure/express/routes/userRoutes.ts
import { Router } from 'express'
import { PrismaUserRepository } from '../../../domain/repositories/PrismaUserRepository'
import { UserController } from '../../../app/controllers/UserController'
import { UserUseCase } from '../../../app/usecases/UserUseCase'
import { PrismaClient } from '@prisma/client'
import ensureAuth from '../../../shared/middlewares/EnsureAuth'
import AppError from '../../../shared/errors/AppError'

const userRoutes = Router()
const prisma = new PrismaClient()
const userRepository = new PrismaUserRepository(prisma)
const userUseCase = new UserUseCase(userRepository)
const userController = new UserController(userUseCase)

userRoutes.post('/users', userController.createUser.bind(userController))
userRoutes.post('/login', userController.login.bind(userController))

userRoutes.use(ensureAuth)
userRoutes.get('/users/:id', userController.getUserById.bind(userController))

export default userRoutes
