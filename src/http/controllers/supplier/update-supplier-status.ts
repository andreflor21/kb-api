import { makeUpdateSupplierStatusUseCase } from "@/use-cases/factories/supplier/make-update-supplier-status-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function updateSupplierStatus(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const updateSupplierStatusBodySchema = z.object({
		status: z.boolean(),
	})

	const { status } = updateSupplierStatusBodySchema.parse(request.body)

	const { supplierId } = z
		.object({
			supplierId: z.string().uuid(),
		})
		.parse(request.params)

	try {
		const updateSupplierStatus = makeUpdateSupplierStatusUseCase()
		const updatedSupplier = await updateSupplierStatus.execute({
			id: supplierId,
			status,
		})

		return reply.status(200).send(updatedSupplier)
	} catch (error) {
		reply.status(500).send()
	}
}

export const updateSupplierStatusSchema = {
	tags: ["Fornecedores"],
	security: [{ BearerAuth: [] }],
	body: {
		type: "object",
		properties: {
			status: { type: "boolean" },
		},
		required: ["status"],
	},
	params: {
		type: "object",
		properties: {
			supplierId: { type: "string" },
		},
		required: ["supplierId"],
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
