import AppError from "@/shared/errors/app-error"
import { makeListProductsUseCase } from "@/use-cases/factories/products/make-list-products-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const listProducts = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const ListProductsRequestSchema = z.object({
		page: z.number().int().positive().optional(),
		perPage: z.number().int().positive().optional(),
	})

	try {
		const validatedData = ListProductsRequestSchema.parse(request.query)
		const listProductsUseCase = makeListProductsUseCase()
		const products = await listProductsUseCase.execute()
		reply.status(200).send(products)
	} catch (error) {
		if (error instanceof AppError) {
			return reply
				.status(error.statusCode)
				.send({ message: error.message })
		}
	}
}

export const listProductsSchema = {
	tags: ["Produtos"],
	summary: "Lista todos os produtos",
	security: [{ BearerAuth: [] }],
	response: {
		200: {
			type: "object",
			properties: {
				products: {
					type: "array",
					items: {
						type: "object",
						properties: {
							id: { type: "string", format: "uuid" },
							code: { type: "string" },
							description: { type: "string" },
							additionalDescription: { type: "string" },
							stockUnit: {
								type: "object",
								properties: {
									id: { type: "string", format: "uuid" },
									abrev: { type: "string" },
								},
							},
							ERPCode: { type: "string" },
							productType: {
								type: "object",
								properties: {
									id: { type: "string", format: "uuid" },
									description: { type: "string" },
								},
							},
							productGroup: {
								type: "object",
								properties: {
									id: { type: "string", format: "uuid" },
									description: { type: "string" },
								},
							},
							active: { type: "boolean" },
							suppliers: {
								type: "array",
								items: {
									type: "object",
									properties: {
										supplier: {
											type: "object",
											properties: {
												id: {
													type: "string",
													format: "uuid",
												},
												name: { type: "string" },
											},
										},
										supplierProductCode: { type: "string" },
										leadTime: { type: "number" },
										stockLeadTime: { type: "number" },
										buyUnit: {
											type: "object",
											properties: {
												id: {
													type: "string",
													format: "uuid",
												},
												description: { type: "string" },
												abrev: { type: "string" },
											},
										},
										minQty: { type: "number" },
										buyQty: { type: "number" },
									},
								},
							},
						},
					},
				},
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
}
