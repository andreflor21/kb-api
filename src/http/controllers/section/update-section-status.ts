import { makeUpdateSectionStatusUseCase } from "@/use-cases/factories/section/make-update-section-status-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function updateSectionStatus(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const updateSectionStatusSchema = z.object({
		active: z.boolean(),
	})
	const { id } = z.object({ id: z.string().uuid() }).parse(request.params)
	const { active } = updateSectionStatusSchema.parse(request.body)

	const updateSectionStatus = makeUpdateSectionStatusUseCase()

	try {
		const updatedSection = await updateSectionStatus.execute({
			id,
			active,
		})

		reply.status(204).send()
	} catch (error) {
		reply.status(500).send()
	}
}

export const updateSectionStatusSchema = {
	tags: ["Seções"],
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
			active: { type: "boolean" },
		},
		required: ["active"],
	},
	response: {
		204: {
			description: "Success",
			type: "null",
		},
		404: {
			description: "Not Found",
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
		403: {
			description: "Forbidden",
			type: "object",
			properties: {
				message: { type: "string" },
			},
		},
	},
}
