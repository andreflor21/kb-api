import AppError from "@/shared/errors/app-error"
import { makeUpdateProductUseCase } from "@/use-cases/factories/products/make-update-product-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const updateProduct = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { id } = z.object({ id: z.string() }).parse(request.params)

	const UpdateProductRequestSchema = z.object({
		id: z.string(),
		code: z.string().max(20),
		description: z.string().max(100),
		additionalDescription: z.string().optional(),
		stockUnit: z.string().max(10),
		ERPCode: z.string().optional(),
		productType: z.string().max(100),
		productGroup: z.string().max(100).optional(),
	})

	try {
		const validatedData = UpdateProductRequestSchema.parse(request.body)
		const updateProductUseCase = makeUpdateProductUseCase()
		const product = await updateProductUseCase.execute(validatedData)
		console.log(product)
		reply.status(204).send()
	} catch (error) {
		if (error instanceof AppError) {
			return reply
				.status(error.statusCode)
				.send({ message: error.message })
		}
	}
}

export const updateProductSchema = {
	tags: ["Produtos"],
	summary: "Atualiza um produto",
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
		204: {
			type: "null",
			description: "Success",
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
