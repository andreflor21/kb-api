import AppError from "@/shared/errors/app-error"
import { makeDeleteProductGroupUseCase } from "@/use-cases/factories/products/groups/make-delete-product-group-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const deleteProductGroup = async (
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<void> => {
	const DeleteProductGroupParamsSchema = z.object({
		id: z.string().uuid(),
	})
	try {
		const { id } = DeleteProductGroupParamsSchema.parse(request.params)
		const deleteProductGroup = makeDeleteProductGroupUseCase()
		await deleteProductGroup.execute(id)

		reply.status(204).send()
	} catch (error) {
		console.error(error)
		if (error instanceof AppError) {
			return reply
				.status(error.statusCode)
				.send({ message: error.message })
		}
	}
}

export const deleteProductGroupSchema = {
	tags: ["Grupos de Produtos"],
	summary: "Deleta um grupo de produto",
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
			description: "Success",
			type: "null",
		},
		400: {
			description: "Bad Request",
			type: "object",
			properties: {
				message: { type: "string" },
			},
		},
		404: {
			description: "Not Found",
			type: "object",
			properties: {
				message: { type: "string" },
			},
		},
	},
}
