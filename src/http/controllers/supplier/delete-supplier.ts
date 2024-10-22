import { makeDeleteSupplierUseCase } from "@/use-cases/factories/supplier/make-delete-supplier-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function deleteSupplier(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { supplierId } = z
		.object({
			supplierId: z.string().uuid(),
		})
		.parse(request.params)

	try {
		const deleteSupplier = makeDeleteSupplierUseCase()
		await deleteSupplier.execute({ id: supplierId })

		return reply.status(204).send()
	} catch (error) {
		reply.status(500).send()
	}
}

export const deleteSupplierSchema = {
	tags: ["Fornecedores"],
	security: [{ BearerAuth: [] }],
	params: {
		type: "object",
		properties: {
			supplierId: { type: "string" },
		},
		required: ["supplierId"],
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
		403: {
			type: "object",
			description: "Forbidden",
			properties: {
				message: { type: "string" },
			},
		},
	},
}
