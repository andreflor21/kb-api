import { makeListProductTypeUseCase } from "@/use-cases/factories/products/types/make-list-product-type-use-case"
import type { FastifyRequest, FastifyReply } from "fastify"

export const listProductTypes = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const listProductTypeUseCase = makeListProductTypeUseCase()
	const productTypes = await listProductTypeUseCase.execute()
	reply.status(200).send({ productTypes })
}

export const listProductTypesSchema = {
	tags: ["Tipos de Produto"],
	summary: "Lista todos os tipos de produto",
	security: [{ BearerAuth: [] }],
	response: {
		200: {
			descripion: "Success",
			type: "object",
			properties: {
				productTypes: {
					type: "array",
					items: {
						type: "object",
						properties: {
							id: { type: "string", format: "uuid" },
							description: { type: "string" },
						},
					},
				},
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
