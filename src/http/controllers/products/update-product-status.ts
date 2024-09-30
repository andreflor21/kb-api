import AppError from "@/shared/errors/app-error"
import { makeUpdateProductStatusUseCase } from "@/use-cases/factories/products/make-update-product-status-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const updateProductStatus = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { id } = z.object({ id: z.string() }).parse(request.params)

	const UpdateProductStatusRequestSchema = z.object({
		status: z.boolean(),
	})

	try {
		const { status } = UpdateProductStatusRequestSchema.parse(request.body)
		const updateProductStatusUseCase = makeUpdateProductStatusUseCase()
		const product = await updateProductStatusUseCase.execute(id, status)
		reply.status(204).send()
	} catch (error) {
		if (error instanceof AppError) {
			return reply
				.status(error.statusCode)
				.send({ message: error.message })
		}
	}
}

export const updateProductStatusSchema = {
	tags: ["Produtos"],
	summary: "Atualiza o status de um produto",
	security: [{ BearerAuth: [] }],
	params: {
		type: "object",
		properties: {
			id: { type: "string" },
		},
		required: ["id"],
	},
	body: {
		type: "object",
		properties: {
			status: { type: "boolean" },
		},
		required: ["status"],
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
