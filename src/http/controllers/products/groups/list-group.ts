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
	tags: ["Groupos de Produtos"],
	summary: "Lista todos os grupos de produtos",
	security: [{ BearerAuth: [] }],
	response: {
		200: {
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
}
