import { ProfileAlreadyExistsError } from "@/shared/errors/profile-already-exists-error"
import { makeDuplicateProfileUseCase } from "@/use-cases/factories/profile/make-duplicate-profile-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function duplicateProfile(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = z.object({ id: z.string().uuid() }).parse(request.params)
	const { description } = z
		.object({
			description: z.string().min(3),
		})
		.parse(request.body)

	const duplicateProfile = makeDuplicateProfileUseCase()

	try {
		const newProfile = await duplicateProfile.execute(id, description)

		reply.status(201).send(newProfile)
	} catch (error) {
		if (error instanceof ProfileAlreadyExistsError) {
			reply.status(error.statusCode).send({ message: error.message })
		} else {
			reply.status(500).send()
		}
	}
}

export const duplicateProfileSchema = {
	tags: ["Perfil"],
	security: [
		{
			BearerAuth: [],
		},
	],
	params: {
		type: "object",
		properties: {
			id: { type: "string", format: "uuid" },
		},
		required: ["id"],
	},
	body: {
		type: "object",
		properties: {
			description: { type: "string" },
		},
		required: ["description"],
	},
	response: {
		201: {
			description: "Success",
			type: "object",
			properties: {
				profile: {
					type: "object",
					properties: {
						id: { type: "string" },
						description: { type: "string" },
						users: {
							type: "array",
							items: {
								type: "object",
								properties: {
									id: { type: "string" },
									name: { type: "string" },
									email: { type: "string" },
								},
							},
						},
						routes: {
							type: "array",
							items: {
								type: "object",
								properties: {
									id: { type: "string" },
									description: { type: "string" },
									createdAt: { type: "string" },
								},
							},
						},
					},
				},
			},
		},
		400: {
			description: "Bad Request",
			type: "object",
			properties: {
				message: { type: "string" },
				errors: { type: "string" },
			},
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
}
