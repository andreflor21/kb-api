import type { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeGetProductByIdUseCase } from "@/use-cases/factories/products/make-get-product-by-id"
import AppError from "@/shared/errors/app-error"

export const getProductById = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { id } = z.object({ id: z.string() }).parse(request.params)

	try {
		const getProductByIdUseCase = makeGetProductByIdUseCase()
		const product = await getProductByIdUseCase.execute({ id })
		reply.status(200).send(product)
	} catch (error) {
		if (error instanceof AppError) {
			return reply
				.status(error.statusCode)
				.send({ message: error.message })
		}
	}
}

export const getProductByIdSchema = {
	tags: ["Produtos"],
	summary: "Busca um produto por ID",
	security: [{ BearerAuth: [] }],
	params: {
		type: "object",
		properties: {
			id: { type: "string" },
		},
		required: ["id"],
	},
	response: {
		200: {
			type: "object",
			product: {
				type: "object",
				properties: {
					id: { type: "string", format: "uuid" },
					code: { type: "string" },
					description: { type: "string" },
					additionalDescription: { type: "string" },
					stockUnit: { type: "string" },
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
		404: {
			type: "object",
			description: "Not Found",
			properties: {
				message: { type: "string" },
			},
		},
	},
}
