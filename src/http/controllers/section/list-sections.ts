import { makeListSectionsUseCase } from "@/use-cases/factories/section/make-list-sections-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function listSections(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const listSections = makeListSectionsUseCase()

	try {
		const paginationSchema = z.object({
			page: z.number().default(1),
			pageSize: z.number().default(10),
		})
		const { page, pageSize } = paginationSchema.parse(request.query)
		const { sections, totalSections } = await listSections.execute({
			skip: (page - 1) * pageSize,
			take: pageSize,
		})

		const totalPages = Math.ceil(totalSections / pageSize)
		reply.status(200).send({ sections, totalPages, currentPage: page })
	} catch (error) {
		reply.status(500).send()
	}
}

export const listSectionsSchema = {
	tags: ["Seções"],
	security: [{ BearerAuth: [] }],
	querystring: {
		type: "object",
		properties: {
			page: { type: "number" },
			pageSize: { type: "number" },
		},
	},
	response: {
		200: {
			description: "Success",
			type: "object",
			properties: {
				sections: {
					type: "array",
					items: {
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
				totalPages: { type: "number" },
				currentPage: { type: "number" },
			},
		},
		403: {
			type: "object",
			description: "Forbidden",
			properties: {
				message: { type: "string" },
			},
		},
		401: {
			type: "object",
			description: "Unauthorized",
			properties: {
				message: { type: "string" },
			},
		},
	},
}
