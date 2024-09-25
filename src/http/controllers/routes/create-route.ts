import path from "node:path"
import { makeCreateRouteUseCase } from "@/use-cases/factories/routes/make-create-route-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const createRoute = async (
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

	const createRoute = makeCreateRouteUseCase()
	try {
		const newRoute = await createRoute.execute({
			description,
			path,
			method,
		})

		reply.status(201).send(newRoute)
	} catch (error) {
		reply.status(500).send()
	}
}

export const createRouteSchema = {
	tags: ["Rotas"],
	security: [{ BearerAuth: [] }],
	body: {
		type: "object",
		properties: {
			description: { type: "string" },
			path: { type: "string" },
			method: { type: "string" },
		},
		required: ["description", "path"],
	},
	response: {
		201: {
			description: "Success",
			type: "object",
			properties: {
				id: { type: "string" },
				description: { type: "string" },
				path: { type: "string" },
				method: { type: "string" },
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
