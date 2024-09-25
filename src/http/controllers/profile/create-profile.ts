import { ProfileAlreadyExistsError } from "@/shared/errors/profile-already-exists-error"
import { makeCreateProfileUseCase } from "@/use-cases/factories/profile/make-create-profile-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function createProfile(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { description, users, routes } = z
		.object({
			description: z.string().min(3),
			users: z.array(z.string()),
			routes: z.array(z.string()),
		})
		.parse(request.body)

	const createProfile = makeCreateProfileUseCase()

	try {
		const newProfile = await createProfile.execute({
			description,
			users: users ?? [],
			routes: routes ?? [],
		})

		reply.status(201).send(newProfile)
	} catch (error) {
		if (error instanceof ProfileAlreadyExistsError) {
			reply.status(error.statusCode).send({ message: error.message })
		} else {
			reply.status(500).send()
		}
	}
}

export const createProfileSchema = {
	tags: ["Perfil"],
	security: [
		{
			BearerAuth: [],
		},
	],
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
									method: { type: "string" },
								},
							},
						},
					},
				},
			},
		},
		400: {
			descriptiom: "Bad Request",
			type: "object",
			properties: {
				message: { type: "string" },
			},
		},
		409: {
			description: "Conflict",
			type: "object",
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
		401: {
			description: "Unauthorized",
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
