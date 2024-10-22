import AppError from "@/shared/errors/app-error"
import { makeUpdateProductGroupUseCase } from "@/use-cases/factories/products/groups/make-update-product-group-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const updateProductGroup = async (
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<void> => {
	const UpdateProductGroupSchema = z.object({
		description: z.string().max(100),
	})

	const UpdateProductGroupParamsSchema = z.object({
		id: z.string().uuid(),
	})
	try {
		const { id } = UpdateProductGroupParamsSchema.parse(request.params)
		const { description } = UpdateProductGroupSchema.parse(request.body)
		const updateProductGroup = makeUpdateProductGroupUseCase()
		const updatedProductGroup = await updateProductGroup.execute({
			id,
			description: description.toUpperCase(),
		})

		reply.status(200).send(updatedProductGroup)
	} catch (error) {
		console.error(error)
		if (error instanceof AppError) {
			return reply
				.status(error.statusCode)
				.send({ message: error.message })
		}
	}
}

export const updateProductGroupSchema = {
	tags: ["Grupos de Produtos"],
	summary: "Atualiza um grupo de produto",
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
			description: { type: "string" },
		},
		required: ["description"],
	},
	response: {
		200: {
			type: "object",
			properties: {
				productGroup: {
					type: "object",
					properties: {
						id: { type: "string" },
						description: { type: "string" },
					},
				},
			},
		},
		400: {
			type: "object",
			properties: {
				message: { type: "string" },
			},
		},
	},
}
