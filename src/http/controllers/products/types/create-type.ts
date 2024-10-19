import AppError from "@/shared/errors/app-error"
import { makeCreateProductTypeUseCase } from "@/use-cases/factories/products/types/make-create-product-type-use-case"
import type { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export const createProductType = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const CreateProductTypeRequestSchema = z.object({
		description: z.string().max(100),
	})

	try {
		const { description } = CreateProductTypeRequestSchema.parse(
			request.body,
		)
		const createProductTypeUseCase = makeCreateProductTypeUseCase()
		const productType = await createProductTypeUseCase.execute(description)
		reply.status(201).send({ productType })
	} catch (error) {
		if (error instanceof AppError) {
			return reply
				.status(error.statusCode)
				.send({ message: error.message })
		}
	}
}

export const createProductTypeSchema = {
	tags: ["Tipos de Produto"],
	summary: "Cria um novo tipo de produto",
	security: [{ BearerAuth: [] }],
	body: {
		type: "object",
		properties: {
			description: { type: "string" },
		},
	},
	response: {
		201: {
			description: "Success",
			type: "object",
			properties: {
				productType: {
					type: "object",
					properties: {
						id: { type: "string", format: "uuid" },
						description: { type: "string" },
					},
				},
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
