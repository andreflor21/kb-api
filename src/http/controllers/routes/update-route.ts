import path from "node:path"
import { makeUpdateRouteUseCase } from "@/use-cases/factories/routes/make-update-route-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const updateRoute = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { description, path, method } = z
		.object({
			description: z.string().min(3),
			path: z.string().min(3),
			method: z.enum(["GET", "POST", "PATCH", "PUT", "DELETE"]),
		})
		.parse(request.body)
	const { id } = z.object({ id: z.string().uuid() }).parse(request.params)

	const updateRoute = makeUpdateRouteUseCase()
	try {
		const updatedRoute = await updateRoute.execute({
			id,
			description,
			path,
			method,
		})

		reply.status(200).send(updatedRoute)
	} catch (error) {
		reply.status(500).send()
	}
}

export const updateRouteSchema = {
	tags: ["Rotas"],
	security: [{ BearerAuth: [] }],
	params: {
		type: "object",
		properties: {
			id: { type: "string" },
		},
		required: ["id"],
	},
	body: {
		type: "object",
		properties: {
			description: { type: "string" },
			path: { type: "string" },
			method: { type: "string" },
		},
	},
	response: {
		200: {
			description: "Success",
			type: "object",
			properties: {
				id: { type: "string" },
				description: { type: "string" },
				path: { type: "string" },
				method: { type: "string" },
			},
		},
		404: {
			description: "Not Found",
			type: "object",
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
