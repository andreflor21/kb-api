import AppError from "@/shared/errors/app-error"
import { makeCreateProductUseCase } from "@/use-cases/factories/products/make-create-product-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const createProduct = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const CreateProductRequestSchema = z.object({
		code: z.string().max(20),
		description: z.string().max(100),
		additionalDescription: z.string().optional(),
		stockUnit: z.string().max(10),
		ERPCode: z.string().optional(),
		supplierLeadTimeDays: z.number().optional(),
		productType: z.string().max(100),
		productGroup: z.string().max(100).optional(),
	})

	try {
		const validatedData = CreateProductRequestSchema.parse(request.body)
		const createProductUseCase = makeCreateProductUseCase()
		const product = await createProductUseCase.execute(validatedData)
		reply.status(201).send(product)
	} catch (error) {
		console.error(error)
		if (error instanceof AppError) {
			return reply
				.status(error.statusCode)
				.send({ message: error.message })
		}

		// reply.status(500).send({ message: error.message });
	}
}

export const createProductSchema = {
	tags: ["Produtos"],
	summary: "Cria um novo produto",
	security: [{ BearerAuth: [] }],
	body: {
		type: "object",
		properties: {
			code: { type: "string" },
			description: { type: "string" },
			additionalDescription: { type: "string" },
			stockUnit: { type: "string" },
			ERPCode: { type: "string" },
			productType: { type: "string" },
			productGroup: { type: "string" },
		},
		required: ["code", "description", "stockUnit", "productType"],
	},
	response: {
		201: {
			type: "object",
			properties: {
				product: {
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
		400: {
			type: "object",
			properties: {
				message: { type: "string" },
				errors: { type: "object" },
			},
		},
		409: {
			type: "object",
			properties: {
				message: { type: "string" },
			},
		},
		500: {
			type: "object",
			properties: {
				message: { type: "string" },
			},
		},
	},
}
