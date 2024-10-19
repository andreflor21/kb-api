import { verifyRouteAccess } from "@/http/middleware/routeAccess"
import { verifyJwt } from "@/http/middleware/verifyJwt"
import type { FastifyInstance } from "fastify"
import { authenticateUser, authenticateUserSchema } from "./authenticate"
import { changePassword, changePasswordSchema } from "./change-password"
import { createUser, createUserSchema } from "./create-user"
import { deleteUser, deleteUserSchema } from "./delete-user"
import { forgotPassword, forgotPasswordSchema } from "./forgot-password"
import { getUserById, getUserByIdSchema } from "./get-user-by-id"
import { listUsers, listUsersSchema } from "./list-users"
import { recoverPassword, recoverPasswordSchema } from "./recover-password"
import { updateUser, updateUserSchema } from "./update-user"
import { updateUserStatus, updateUserStatusSchema } from "./update-user-status"

export async function userRoutes(app: FastifyInstance) {
	app.post(
		"/login",
		{
			schema: authenticateUserSchema.schema,
			config: {
				rateLimit: {
					max: 5, // maximum of 5 requests
					timeWindow: "1 minute", // per minute
				},
			},
		},
		authenticateUser,
	)
	app.post("/forgot-password", forgotPasswordSchema, forgotPassword)
	app.post(
		"/reset-password/:token_id",
		recoverPasswordSchema,
		recoverPassword,
	)
	app.post("/users/new", createUserSchema, createUser)
	app.get(
		"/users",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: listUsersSchema.schema,
		},
		listUsers,
	)
	app.get(
		"/users/:id",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: getUserByIdSchema.schema,
		},
		getUserById,
	)
	app.patch(
		"/users/:id/edit",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: updateUserSchema.schema,
		},
		updateUser,
	)
	app.patch(
		"/users/:id/change-password",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: changePasswordSchema.schema,
		},
		changePassword,
	)
	app.delete(
		"/users/:id/delete",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: deleteUserSchema.schema,
		},
		deleteUser,
	)
	app.put(
		"/users/:id/status",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: updateUserStatusSchema.schema,
		},
		updateUserStatus,
	)
}
