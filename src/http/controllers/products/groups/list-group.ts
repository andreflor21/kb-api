import { makeListProductGroupUseCase } from "@/use-cases/factories/products/groups/make-list-product-group-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"

export const listProductGroup = async (
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<void> => {
	const listProductGroup = makeListProductGroupUseCase()
	const productGroups = await listProductGroup.execute()

	reply.status(200).send(productGroups)
}

export const listProductGroupSchema = {
	tags: ["Grupos de Produto"],
	summary: "Lista todos os Grupos de Produto",
	security: [{ BearerAuth: [] }],
	response: {
		200: {
			description: "Success",
			type: "object",
			properties: {
				productGroups: {
					type: "array",
					items: {
						type: "object",
						properties: {
							id: { type: "string" },
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
