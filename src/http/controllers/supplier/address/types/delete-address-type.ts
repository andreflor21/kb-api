import { makeDeleteAddressTypeUseCase } from "@/use-cases/factories/address/types/make-delete-address-type-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function deleteAddressType(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { addressTypeId } = z
		.object({ addressTypeId: z.string().uuid() })
		.parse(request.params)
	const deleteAddressType = makeDeleteAddressTypeUseCase()

	try {
		await deleteAddressType.execute({
			id: addressTypeId,
		})

		reply.status(204).send()
	} catch (error) {
		reply.status(500).send()
	}
}

export const deleteAddressTypeSchema = {
	tags: ["Tipos de Endereços"],
	security: [{ BearerAuth: [] }],
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
