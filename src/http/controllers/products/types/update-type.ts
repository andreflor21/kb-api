import AppError from "@/shared/errors/app-error"
import { makeUpdateProductTypeUseCase } from "@/use-cases/factories/products/types/make-update-product-type-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const updateProductType = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const UpdateProductTypeRequestSchema = z.object({
		description: z.string().max(100),
	})
	const UpdateProductTypeParamsSchema = z.object({
		id: z.string().uuid(),
	})

	try {
		const { description } = UpdateProductTypeRequestSchema.parse(
			request.body,
		)
		const { id } = UpdateProductTypeParamsSchema.parse(request.params)
		const updateProductTypeUseCase = makeUpdateProductTypeUseCase()
		const productType = await updateProductTypeUseCase.execute({
			id,
			description,
		})
		reply.status(200).send({ productType })
	} catch (error) {
		if (error instanceof AppError) {
			return reply
				.status(error.statusCode)
				.send({ message: error.message })
		}
	}
}

export const updateProductTypeSchema = {
	tags: ["Tipos de Produto"],
	summary: "Atualiza um tipo de produto",
	security: [{ BearerAuth: [] }],
	body: {
		type: "object",
		properties: {
			description: { type: "string" },
		},
	},
	params: {
		type: "object",
		properties: {
			id: { type: "string", format: "uuid" },
		},
	},
	response: {
		200: {
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
