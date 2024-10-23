import { makeListProfileUseCase } from "@/use-cases/factories/profile/make-list-profiles-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function listProfiles(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const paginationSchema = z.object({
		page: z.number().min(1).default(1),
		pageSize: z.number().default(10),
	})
	const { page, pageSize } = paginationSchema.parse(request.query)
	const listProfiles = makeListProfileUseCase()

	const { profiles, totalProfiles } = await listProfiles.execute({
		skip: (page - 1) * pageSize,
		take: pageSize,
	})
	const totalPages = Math.ceil(totalProfiles / pageSize)
	return reply.status(200).send({ profiles, totalPages, currentPage: page })
}

export const listProfilesSchema = {
	tags: ["Perfil"],
	security: [
		{
			BearerAuth: [],
		},
	],
	query: {
		type: "object",
		properties: {
			page: { type: "number" },
			pageSize: { type: "number" },
		},
	},
	response: {
		200: {
			description: "Success",
			type: "object",
			properties: {
				profiles: {
					type: "array",
					items: {
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
				totalPages: { type: "number" },
				currentPage: { type: "number" },
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
