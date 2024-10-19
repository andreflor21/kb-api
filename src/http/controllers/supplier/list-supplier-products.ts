import type { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeListProductsBySupplierUseCase } from "@/use-cases/factories/products/make-list-products-by-supplier"
import AppError from "@/shared/errors/app-error"

export const listSupplierProducts = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const ListSupplierProductsRequestQuerySchema = z.object({
		page: z.number().int().positive().optional(),
		perPage: z.number().int().positive().optional(),
	})
	const ListSupplierProductsRequestSchema = z.object({
		supplierId: z.string(),
	})

	try {
		const validatedData = ListSupplierProductsRequestSchema.parse(
			request.params,
		)
		const listProductsBySupplierUseCase =
			makeListProductsBySupplierUseCase()
		const products =
			await listProductsBySupplierUseCase.execute(validatedData)
		reply.status(200).send(products)
	} catch (error) {
		if (error instanceof AppError) {
			return reply
				.status(error.statusCode)
				.send({ message: error.message })
		}
	}
}

export const listSupplierProductsSchema = {
	tags: ["Produtos", "Fornecedores"],
	summary: "Lista todos os produtos de um fornecedor",
	security: [{ BearerAuth: [] }],
	params: {
		type: "object",
		properties: {
			supplierId: { type: "string" },
		},
		required: ["supplierId"],
	},
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
			},
		},
		404: {
			type: "object",
			description: "Not Found",
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
