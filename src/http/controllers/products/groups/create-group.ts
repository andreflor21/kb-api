import AppError from "@/shared/errors/app-error"
import { makeCreateProductGroupUseCase } from "@/use-cases/factories/products/groups/make-create-product-group-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const createProductGroup = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const CreateProductGroupRequestSchema = z.object({
		description: z.string().max(100),
	})

	try {
		const { description } = CreateProductGroupRequestSchema.parse(
			request.body,
		)
		const createProductGroupUseCase = makeCreateProductGroupUseCase()
		const productGroup =
			await createProductGroupUseCase.execute(description)
		reply.status(201).send(productGroup)
	} catch (error) {
		console.error(error)
		if (error instanceof AppError) {
			return reply
				.status(error.statusCode)
				.send({ message: error.message })
		}
	}
}

export const createProductGroupSchema = {
	tags: ["Groupos de Produtos"],
	summary: "Cria um novo grupo de produto",
	security: [{ BearerAuth: [] }],
	body: {
		type: "object",
		properties: {
			description: { type: "string" },
		},
		required: ["description"],
	},
	response: {
		201: {
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
