import AppError from "@/shared/errors/app-error"
import { makeDeleteProductUseCase } from "@/use-cases/factories/products/make-delete-product-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const deleteProduct = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const DeleteProductRequestSchema = z.object({
		id: z.string(),
	})

	try {
		const validatedData = DeleteProductRequestSchema.parse(request.params)
		const deleteProductUseCase = makeDeleteProductUseCase()
		await deleteProductUseCase.execute(validatedData.id)
		reply.status(204).send()
	} catch (error) {
		if (error instanceof AppError) {
			return reply
				.status(error.statusCode)
				.send({ message: error.message })
		}
	}
}

export const deleteProductSchema = {
	tags: ["Produtos"],
	summary: "Deleta um produto",
	security: [{ BearerAuth: [] }],
	params: {
		type: "object",
		properties: {
			id: { type: "string" },
		},
		required: ["id"],
	},
	response: {
		204: {
			type: "object",
			description: "Success",
			properties: {
				message: { type: "string" },
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
		401: {
			type: "object",
			description: "Unauthorized",
			properties: {
				message: { type: "string" },
			},
		},
	},
}
