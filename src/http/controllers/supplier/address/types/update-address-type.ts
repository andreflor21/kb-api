import { makeUpdateAddressTypeUseCase } from "@/use-cases/factories/address/types/make-update-address-type-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function updateAddressType(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const createAddressTypeSchema = z.object({
		description: z.string().max(100),
	})

	const { description } = createAddressTypeSchema.parse(request.body)
	const { addressTypeId } = z
		.object({ addressTypeId: z.string().uuid() })
		.parse(request.params)
	const updateAddressType = makeUpdateAddressTypeUseCase()

	try {
		const addressType = await updateAddressType.execute({
			id: addressTypeId,
			description,
		})

		reply.status(204).send()
	} catch (error) {
		reply.status(500).send()
	}
}

export const updateAddressTypeSchema = {
	tags: ["Tipos de Endereços"],
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
			addressTypeId: { type: "string", format: "uuid" },
		},
	},
	response: {
		204: {
			description: "Success",
		},
		500: {
			type: "object",
			properties: {
				message: { type: "string" },
			},
		},
	},
}
