import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { PrismaUserRepository } from '@repositories/PrismaUserRepository';
import { UserController } from '@controllers/UserController';
import { UserUseCase } from '@usecases/UserUseCase';

const app: Application = express();
app.use(bodyParser.json());

const userRepository = new PrismaUserRepository();
const userUseCase = new UserUseCase(userRepository);
const userController = new UserController(userUseCase);

app.post('/users', userController.createUser.bind(userController));
app.get('/users/:id', userController.getUserById.bind(userController));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
