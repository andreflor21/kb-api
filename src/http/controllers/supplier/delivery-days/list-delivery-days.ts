import { makeListDeliveryDaysUseCase } from "@/use-cases/factories/supplier/make-list-delivery-days-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const listDeliveryDays = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { supplierId } = z
		.object({ supplierId: z.string().uuid() })
		.parse(request.params)

	try {
		const listDeliveryDays = makeListDeliveryDaysUseCase()

		const deliveryDays = await listDeliveryDays.execute({ supplierId })

		return reply.status(200).send(deliveryDays)
	} catch (error) {
		reply.status(500).send()
	}
}

export const listDeliveryDaysSchema = {
	tags: ["Dias de entrega"],
	security: [{ BearerAuth: [] }],
	params: {
		type: "object",
		required: ["supplierId"],
		properties: {
			supplierId: { type: "string", format: "uuid" },
		},
	},
	response: {
		200: {
			description: "Success",
			type: "array",
			items: {
				type: "object",
				properties: {
					id: { type: "string" },
					supplierId: { type: "string" },
					days: { type: "number" },
					period: { type: "string" },
					hour: { type: "string" },
				},
			},
		},
	},
}
