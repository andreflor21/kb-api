// src/infrastructure/express/routes/userRoutes.ts
import { Router } from 'express';
import { PrismaUserRepository } from '../../../repositories/PrismaUserRepository';
import { UserController } from '../../../http/controllers/user/UserController';
import { UserUseCase } from '../../../usecases/UserUseCase';
import { PrismaClient } from '@prisma/client';
import ensureAuth from '../../../shared/middlewares/EnsureAuth';
import AppError from '../../../shared/errors/AppError';

const userRoutes = Router();
const prisma = new PrismaClient();
const userRepository = new PrismaUserRepository(prisma);
const userUseCase = new UserUseCase(userRepository);
const userController = new UserController(userUseCase);

userRoutes.post(
    '/usuarios/novo',
    userController.createUser.bind(userController)
);
userRoutes.post(
    '/esqueci-senha',
    userController.forgotPassword.bind(userController)
);
userRoutes.post('/login', userController.login.bind(userController));
userRoutes.post(
    '/usuarios/:token',
    userController.recoverPassword.bind(userController)
);

userRoutes.use(ensureAuth);
userRoutes.get(
    '/usuarios/:id',
    userController.getUserById.bind(userController)
);
userRoutes.get('/usuarios', userController.getUsers.bind(userController));

export default userRoutes;
