import { makeUpdateDeliveryDayUseCase } from "@/use-cases/factories/supplier/make-update-delivery-day-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const updateDeliveryDay = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { supplierId } = z
		.object({ supplierId: z.string().uuid() })
		.parse(request.params)

	const updateDeliveryDayBodySchema = z.object({
		deliveryDays: z.array(
			z.object({
				id: z.string().uuid(),
				days: z.number().min(0).max(6),
				period: z.string().or(z.null()).optional(),
				hour: z.string().max(5).or(z.null()).optional(),
			}),
		),
	})

	const { deliveryDays } = updateDeliveryDayBodySchema.parse(request.body)

	try {
		const updateDeliveryDay = makeUpdateDeliveryDayUseCase()
		const parsedDeliveryDays = deliveryDays.map((item) => ({
			days: item.days.toString(),
			period: item.period ?? null,
			hour: item.hour ?? null,
			supplierId,
			id: item.id,
		}))
		const updatedDeliveryDay = await updateDeliveryDay.execute({
			supplierId,
			deliveryDays: parsedDeliveryDays,
		})

		return reply.status(200).send(updatedDeliveryDay)
	} catch (error) {
		reply.status(500).send()
	}
}

export const updateDeliveryDaySchema = {
	tags: ["Dias de entrega"],
	security: [{ BearerAuth: [] }],
	params: {
		type: "object",
		required: ["supplierId"],
		properties: {
			supplierId: { type: "string", format: "uuid" },
		},
	},
	body: {
		type: "object",
		properties: {
			deliveryDays: {
				type: "array",
				items: {
					type: "object",
					properties: {
						days: {
							type: "number",
							minimum: 0,
							maximum: 6,
							description:
								"0 - Domingo, 1 - Segunda, 2 - Terça, 3 - Quarta, 4 - Quinta, 5 - Sexta, 6 - Sábado",
						},
						period: {
							type: "string",
							description: "Manhã, Tarde, Noite",
						},
						hour: {
							type: "string",
							maxLength: 5,
							description: "HH:mm",
						},
					},
				},
			},
		},
		required: ["deliveryDays"],
	},
	response: {
		200: {
			description: "Success",
			type: "object",
			properties: {
				deliveryDays: {
					type: "array",
					items: {
						type: "object",
						properties: {
							id: { type: "string" },
							supplierId: { type: "string" },
							days: { type: "string" },
							period: { type: "string" },
							hour: { type: "string" },
						},
					},
				},
			},
		},
		404: {
			description: "Not found",
			type: "object",
			properties: {
				message: { type: "string" },
			},
		},
		403: {
			description: "Forbidden",
			type: "object",
			properties: {
				message: { type: "string" },
			},
		},
		401: {
			description: "Unauthorized",
			type: "object",
			properties: {
				message: { type: "string" },
			},
		},
		400: {
			description: "Bad Request",
			type: "object",
			properties: {
				message: { type: "string" },
			},
		},
	},
}
