import { makeListUsersUseCase } from "@/use-cases/factories/user/make-list-users-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
	const paginationSchema = z.object({
		page: z.number().min(1).default(1),
		pageSize: z.number().default(10),
	})
	const { page, pageSize } = paginationSchema.parse(request.query)

	const listUsers = makeListUsersUseCase()

	const { users, totalUsers } = await listUsers.execute({
		skip: (page - 1) * pageSize,
		take: pageSize,
	})
	const totalPages = Math.ceil(totalUsers / pageSize)

	return reply.status(200).send({ users, totalPages, currentPage: page })
}

export const listUsersSchema = {
	schema: {
		tags: ["Usuários"],
		security: [{ BearerAuth: [] }],
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
					users: {
						type: "array",
						items: {
							type: "object",
							properties: {
								id: { type: "string", format: "uuid" },
								name: { type: "string" },
								email: { type: "string" },
								cpf: { type: "string" },
								birthdate: {
									type: "string",
									format: "date-time",
								},
								createdAt: {
									type: "string",
									format: "date-time",
								},
								active: { type: "boolean" },
								changePassword: { type: "boolean" },
								tokenReset: { type: "string" },
								tokenResetExpires: {
									type: "string",
									format: "date-time",
								},
								profile: {
									type: "object",
									properties: {
										id: { type: "string", format: "uuid" },
										description: { type: "string" },
									},
								},
							},
						},
					},
					totalPages: { type: "number" },
					currentPage: { type: "number" },
				},
			},
			403: {
				type: "object",
				description: "Forbidden",
				properties: {
					message: { type: "string" },
				},
			},
			401: {
				type: "object",
				description: "Unauthorized",
				properties: {
					message: { type: "string" },
				},
			},
		},
	},
}
