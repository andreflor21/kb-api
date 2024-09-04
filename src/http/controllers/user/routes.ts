import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middleware/verifyJwt';
import { authenticateUser } from './authenticate';
import { createUser } from './create-user';
import { getUserById } from './get-user-by-id';
import { changePassword } from './change-password';
import { listUsers } from './list-users';
import { recoverPassword } from './recover-password';
import { forgotPassword } from './forgot-password';
import { deleteUser } from './delete-user';
import { updateUserStatus } from './update-user-status';

export async function userRoutes(app: FastifyInstance) {
    app.post('/login', authenticateUser);
    app.post('/forgot-password', forgotPassword);
    app.post('/reset-password/:token_id', recoverPassword);

    app.get('/users', { onRequest: verifyJwt }, listUsers);
    app.post('/users/new', createUser);
    app.get('/users/:id', { onRequest: verifyJwt }, getUserById);
    app.patch('/users/:id/edit', { onRequest: verifyJwt }, getUserById);
    app.patch(
        '/users/:id/change-password',
        { onRequest: verifyJwt },
        changePassword
    );
    app.delete('/users/:id/delete', { onRequest: verifyJwt }, deleteUser);
    app.put('/users/:id/status', { onRequest: verifyJwt }, updateUserStatus);
}
