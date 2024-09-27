import { makeAddDeliveryDayUseCase } from "@/use-cases/factories/supplier/make-add-delivery-day-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const addDeliveryDay = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { supplierId } = z
		.object({ supplierId: z.string().uuid() })
		.parse(request.params)

	const addDeliveryDayBodySchema = z.array(
		z.object({
			days: z.number().min(0).max(6),
			period: z.string().or(z.null()).optional(),
			hour: z.string().max(5).or(z.null()).optional(),
		}),
	)

	const deliveryDays = addDeliveryDayBodySchema.parse(request.body)

	try {
		const addDeliveryDay = makeAddDeliveryDayUseCase()

		const parsedDeliveryDays = deliveryDays.map((item) => ({
			days: item.days.toString(),
			period: item.period ?? null,
			hour: item.hour ?? null,
			supplierId,
		}))

		const newDeliveryDay = await addDeliveryDay.execute({
			supplierId,
			deliveryDays: parsedDeliveryDays,
		})

		return reply.status(201).send(newDeliveryDay)
	} catch (error) {
		reply.status(500).send()
	}
}

export const addDeliveryDaySchema = {
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
	response: {
		201: {
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
		400: {
			description: "Bad Request",
			type: "object",
			properties: {
				message: { type: "string" },
				errors: { type: "string" },
			},
		},
		401: {
			description: "Unauthorized",
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
		500: {
			description: "Internal Server Error",
			type: "object",
			properties: {
				message: { type: "string" },
			},
		},
	},
}
