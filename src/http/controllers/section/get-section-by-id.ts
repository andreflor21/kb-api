import { makeGetSectionByIdUseCase } from "@/use-cases/factories/section/make-get-section-by-id-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function getSectionById(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = z.object({ id: z.string().uuid() }).parse(request.params)

	const getSectionById = makeGetSectionByIdUseCase()

	try {
		const section = await getSectionById.execute({ id })

		reply.status(200).send(section)
	} catch (error) {
		reply.status(500).send()
	}
}

export const getSectionByIdSchema = {
	tags: ["Seções"],
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
				section: {
					type: "object",
					properties: {
						id: { type: "string" },
						description: { type: "string" },
						code: { type: "string" },
						ERPcode: { type: "string" },
						branchMatrixCode: { type: "string" },
						sectionType: {
							type: "object",
							properties: {
								description: { type: "string" },
								abreviation: { type: "string" },
							},
						},
					},
				},
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
