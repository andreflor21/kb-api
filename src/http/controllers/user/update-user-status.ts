import { UserNotFoundError } from "@/shared/errors/user-not-found-error"
import { makeUpdateUserStatusUseCase } from "@/use-cases/factories/user/make-update-user-status-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function updateUserStatus(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const updateUserStatus = makeUpdateUserStatusUseCase()
	const { id } = z
		.object({
			id: z.string().uuid(),
		})
		.parse(request.params)
	const { status } = z
		.object({
			status: z.boolean(),
		})
		.parse(request.body)

	try {
		await updateUserStatus.execute({ id, status })

		reply.status(204).send()
	} catch (error) {
		if (error instanceof UserNotFoundError) {
			reply.status(error.statusCode).send({ message: error.message })
		} else {
			reply.status(500).send()
		}
	}
}

export const updateUserStatusSchema = {
	schema: {
		tags: ["Usuários"],
		params: {
			type: "object",
			required: ["id"],
			properties: {
				id: { type: "string" },
			},
		},
		body: {
			type: "object",
			required: ["status"],
			properties: {
				status: { type: "boolean" },
			},
		},
		response: {
			204: {
				description: "Success",
				type: "null",
			},
			404: {
				description: "Not Found",
				type: "object",
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
		security: [
			{
				BearerAuth: [],
			},
		],
	},
}
