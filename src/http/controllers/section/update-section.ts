import { makeUpdateSectionUseCase } from "@/use-cases/factories/section/make-update-section-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function updateSection(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const updateSectionSchema = z.object({
		description: z.string().min(3),
		code: z.string().min(3),
		ERPcode: z.string().min(3),
		branchMatrixCode: z.string().min(3),
		sectionType: z.string().uuid(),
	})
	const { id } = z.object({ id: z.string().uuid() }).parse(request.params)
	const { description, code, ERPcode, branchMatrixCode, sectionType } =
		updateSectionSchema.parse(request.body)

	const updateSection = makeUpdateSectionUseCase()

	try {
		const updatedSection = await updateSection.execute({
			id,
			description,
			code,
			ERPcode,
			branchMatrixCode,
			sectionType,
		})

		reply.status(204).send()
	} catch (error) {
		reply.status(500).send()
	}
}

export const updateSectionSchema = {
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
			description: { type: "string" },
			code: { type: "string" },
			ERPcode: { type: "string" },
			branchMatrixCode: { type: "string" },
			sectionType: { type: "string" },
		},
		required: [
			"description",
			"code",
			"ERPcode",
			"branchMatrixCode",
			"sectionType",
		],
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
		403: {
			type: "object",
			description: "Forbidden",
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
	},
}
