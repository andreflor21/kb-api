import { UserAlreadyExistsError } from "@/shared/errors/user-already-exists-error"
import { UserNotFoundError } from "@/shared/errors/user-not-found-error"
import { makeUpdateUserUseCase } from "@/use-cases/factories/user/make-update-user-use-case"
import { hash } from "bcryptjs"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
	const updateUser = makeUpdateUserUseCase()
	const { id } = z
		.object({
			id: z.string().uuid(),
		})
		.parse(request.params)
	const { name, email, password, cpf, birthdate, code, profileId, active } = z
		.object({
			name: z.string().optional(),
			email: z.string().email().optional(),
			password: z.string().min(6).optional(),
			cpf: z
				.string()
				.optional()
				.transform((value) =>
					value ? value.replace(/\D/g, "") : value,
				),
			birthdate: z.coerce.date().optional(),
			code: z.string().optional(),
			profileId: z.string().uuid().optional(),
			active: z.boolean().optional(),
		})
		.parse(request.body)

	try {
		let hashedPassword: string | undefined
		if (password) {
			hashedPassword = await hash(password, 10)
		}
		await updateUser.execute({
			id,
			name,
			email,
			hashedPassword,
			cpf,
			birthdate,
			code,
			profileId,
			active,
		})

		reply.status(204).send()
	} catch (error) {
		if (
			error instanceof UserNotFoundError ||
			error instanceof UserAlreadyExistsError
		) {
			reply.status(error.statusCode).send({ message: error.message })
		} else {
			reply.status(500).send()
		}
	}
}

export const updateUserSchema = {
	schema: {
		tags: ["Usuários"],
		body: {
			type: "object",
			required: ["name", "email", "profileId"],
			properties: {
				name: { type: "string" },
				email: { type: "string" },
				cpf: { type: "string" },
				birthdate: { type: "string", format: "date" },
				code: { type: "string" },
				active: { type: "boolean" },
				profileId: { type: "string" },
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
			400: {
				description: "Bad Request",
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
			500: {
				description: "Internal Server Error",
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
		},
		params: {
			type: "object",
			required: ["id"],
			properties: {
				id: { type: "string" },
			},
		},
		security: [
			{
				BearerAuth: [],
			},
		],
	},
}
