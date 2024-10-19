import AppError from "@/shared/errors/app-error"
import { makeDeleteProductTypeUseCase } from "@/use-cases/factories/products/types/make-delete-product-type-use-case"
import type { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export const deleteProductType = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const DeleteProductTypeParamsSchema = z.object({
		id: z.string().uuid(),
	})

	try {
		const { id } = DeleteProductTypeParamsSchema.parse(request.params)
		const deleteProductTypeUseCase = makeDeleteProductTypeUseCase()
		await deleteProductTypeUseCase.execute(id)
		reply.status(204).send()
	} catch (error) {
		if (error instanceof AppError) {
			return reply
				.status(error.statusCode)
				.send({ message: error.message })
		}
	}
}

export const deleteProductTypeSchema = {
	tags: ["Tipos de Produto"],
	summary: "Deleta um tipo de produto",
	security: [{ BearerAuth: [] }],
	params: {
		type: "object",
		properties: {
			id: { type: "string", format: "uuid" },
		},
	},
	response: {
		204: {
			description: "Success",
			type: "null",
		},
		404: {
			type: "object",
			description: "Not Found",
			properties: {
				message: { type: "string" },
			},
		},
		409: {
			type: "object",
			description: "Conflict",
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
		403: {
			type: "object",
			description: "Forbidden",
			properties: {
				message: { type: "string" },
			},
		},
	},
}
