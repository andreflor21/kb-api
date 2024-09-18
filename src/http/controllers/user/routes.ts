import { FastifyInstance } from 'fastify';
import fastifyRateLimit from 'fastify-rate-limit';
import { verifyJwt } from '@/http/middleware/verifyJwt';
import { authenticateUser, authenticateUserSchema } from './authenticate';
import { createUser, createUserSchema } from './create-user';
import { getUserById, getUserByIdSchema } from './get-user-by-id';
import { changePassword, changePasswordSchema } from './change-password';
import { listUsers, listUsersSchema } from './list-users';
import { recoverPassword, recoverPasswordSchema } from './recover-password';
import { forgotPassword, forgotPasswordSchema } from './forgot-password';
import { deleteUser, deleteUserSchema } from './delete-user';
import { updateUserStatus, updateUserStatusSchema } from './update-user-status';
import { updateUser, updateUserSchema } from './update-user';

export async function userRoutes(app: FastifyInstance) {
    app.register(fastifyRateLimit, {
        max: 100, // maximum of 100 requests
        timeWindow: '15 minutes' // per 15 minutes
    });
    app.post('/login', {
        schema: authenticateUserSchema,
        config: {
            rateLimit: {
                max: 5, // maximum of 5 requests
                timeWindow: '1 minute' // per minute
            }
        }
    }, authenticateUser);
    app.post('/forgot-password', forgotPasswordSchema, forgotPassword);
    app.post(
        '/reset-password/:token_id',
        recoverPasswordSchema,
        recoverPassword
    );

    app.post('/users/new', createUserSchema, createUser);
    app.get('/users', listUsersSchema, listUsers);
    app.get(
        '/users/:id',
        { onRequest: verifyJwt, schema: getUserByIdSchema.schema },
        getUserById
    );
    app.patch(
        '/users/:id/edit',
        { onRequest: verifyJwt, schema: updateUserSchema.schema },
        updateUser
    );
    app.patch(
        '/users/:id/change-password',
        { onRequest: verifyJwt, schema: changePasswordSchema.schema },
        changePassword
    );
    app.delete(
        '/users/:id/delete',
        { onRequest: verifyJwt, schema: deleteUserSchema.schema },
        deleteUser
    );
    app.put(
        '/users/:id/status',
        { onRequest: verifyJwt, schema: updateUserStatusSchema.schema },
        updateUserStatus
    );
}
