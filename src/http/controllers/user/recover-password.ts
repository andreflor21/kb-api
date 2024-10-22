import { ExpiredTokenError } from "@/shared/errors/expired-token-error"
import { UserNotFoundError } from "@/shared/errors/user-not-found-error"
import { makeGetUserByTokenUseCase } from "@/use-cases/factories/user/make-get-user-by-token-use-case"
import { makeRecoverPasswordUseCase } from "@/use-cases/factories/user/make-recover-password-use-case"
import { makeUpdateUserStatusUseCase } from "@/use-cases/factories/user/make-update-user-status-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function recoverPassword(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const recoverPassword = makeRecoverPasswordUseCase()
	const updateUserStatus = makeUpdateUserStatusUseCase()
	const getUserByToken = makeGetUserByTokenUseCase()
	const { token_id } = z
		.object({
			token_id: z.string().uuid(),
		})
		.parse(request.params)
	const { password } = z
		.object({
			password: z.string().min(6),
		})
		.parse(request.body)

	try {
		const { user } = await getUserByToken.execute({
			token: token_id,
		})
		if (user) {
			await recoverPassword.execute({ token: token_id, password })
			await updateUserStatus.execute({
				id: user.id,
				status: true,
			})
		}
		reply.status(204).send()
	} catch (error) {
		if (
			error instanceof UserNotFoundError ||
			error instanceof ExpiredTokenError
		) {
			reply.status(error.statusCode).send({ message: error.message })
		} else {
			reply.status(500).send()
		}
	}
}

export const recoverPasswordSchema = {
	schema: {
		tags: ["Usuários"],
		params: {
			type: "object",
			required: ["token_id"],
			properties: {
				token_id: { type: "string" },
			},
		},
		body: {
			type: "object",
			required: ["password"],
			properties: {
				password: { type: "string" },
			},
		},
		response: {
			204: {
				description: "Success",
				type: "null",
			},
			404: {
				type: "object",
				description: "Not Found",
				properties: {
					message: { type: "string" },
				},
			},
			403: {
				type: "object",
				description: "Forbidden",
				properties: {
					message: { type: "string" },
				},
			},
		},
	},
}
