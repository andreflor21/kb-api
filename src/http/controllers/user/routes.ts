import { FastifyInstance } from 'fastify';
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
import { verifyRouteAccess } from '@/http/middleware/routeAccess';

export async function userRoutes(app: FastifyInstance) {
    app.post(
        '/login',
        {
            schema: authenticateUserSchema.schema,
            config: {
                rateLimit: {
                    max: 5, // maximum of 5 requests
                    timeWindow: '1 minute', // per minute
                },
            },
        },
        authenticateUser
    );
    app.post('/forgot-password', forgotPasswordSchema, forgotPassword);
    app.post(
        '/reset-password/:token_id',
        recoverPasswordSchema,
        recoverPassword
    );
    app.post('/users/new', createUserSchema, createUser);
    app.get(
        '/users',
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: listUsersSchema.schema,
        },
        listUsers
    );
    app.get(
        '/users/:id',
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: getUserByIdSchema.schema,
        },
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
