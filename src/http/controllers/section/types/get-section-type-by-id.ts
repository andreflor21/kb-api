import { makeGetSectionTypeByIdUseCase } from "@/use-cases/factories/section/types/make-get-section-type-by-id-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function getSectionTypeById(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = z.object({ id: z.string().uuid() }).parse(request.params)
	console.log(request.params)
	const getSectionTypeById = makeGetSectionTypeByIdUseCase()

	try {
		const sectionType = await getSectionTypeById.execute(id)

		reply.status(200).send(sectionType)
	} catch (error) {
		reply.status(500).send()
	}
}

export const getSectionTypeByIdSchema = {
	tags: ["Tipos de Seções"],
	security: [{ BearerAuth: [] }],
	params: {
		type: "object",
		properties: {
			id: { type: "string" },
		},
		required: ["id"],
	},
	response: {
		200: {
			description: "Success",
			type: "object",
			properties: {
				id: { type: "string" },
				description: { type: "string" },
				abreviation: { type: "string" },
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
			description: "Forbidden",
			type: "object",
			properties: {
				message: { type: "string" },
			},
		},
		500: {
			description: "Internal Server Error",
			type: "null",
		},
	},
}
