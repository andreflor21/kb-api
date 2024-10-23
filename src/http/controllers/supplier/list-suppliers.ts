import { makeListSuppliersUseCase } from "@/use-cases/factories/supplier/make-list-suppliers-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function listSuppliers(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const paginationSchema = z.object({
		page: z.number().min(1).default(1),
		pageSize: z.number().default(10),
	})
	const { page, pageSize } = paginationSchema.parse(request.query)
	const listSuppliers = makeListSuppliersUseCase()
	const { suppliers, totalSuppliers } = await listSuppliers.execute({
		skip: (page - 1) * pageSize,
		take: pageSize,
	})

	const totalPages = Math.ceil(totalSuppliers / pageSize)

	return reply.status(200).send({ suppliers, totalPages, currentPage: page })
}

export const listSuppliersSchema = {
	tags: ["Fornecedores"],
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
			type: "object",
			description: "Success",
			properties: {
				suppliers: {
					type: "array",
					items: {
						type: "object",
						properties: {
							id: { type: "string" },
							name: { type: "string" },
							email: { type: "string" },
							fone: { type: "string" },
							cnpj: { type: "string" },
							ERPcode: { type: "string" },
							legalName: { type: "string" },
							code: { type: "string" },
							created_at: { type: "string" },
							active: { type: "boolean" },
							users: {
								type: "array",
								items: {
									type: "object",
									properties: {
										id: { type: "string" },
										name: { type: "string" },
									},
								},
							},
							addresses: {
								type: "array",
								items: {
									type: "object",
									properties: {
										id: { type: "string" },
										lograd: { type: "string" },
										number: { type: "string" },
										complement: { type: "string" },
										district: { type: "string" },
										city: { type: "string" },
										state: { type: "string" },
										zipcode: { type: "string" },
									},
								},
							},
							deliveryDays: {
								type: "array",
								items: {
									type: "object",
									properties: {
										id: { type: "string" },
										days: { type: "number" },
										period: { type: "string" },
										hour: { type: "string" },
									},
								},
							},
						},
					},
				},
				totalPages: {
					type: "number",
				},
				currentPage: {
					type: "number",
				},
			},
		},
		401: {
			type: "object",
			description: "Unauthorized",
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
