import { SupplierNotFoundError } from "@/shared/errors/supplier-not-found-error"
import { makeUpdateSupplierUseCase } from "@/use-cases/factories/supplier/make-update-supplier-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function updateSupplier(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const updateSupplierBodySchema = z.object({
		name: z.string().max(100),
		cnpj: z.string().max(14),
		email: z.string().email().max(100).or(z.null()),
		fone: z.string().max(11).or(z.null()),
		legalName: z.string().max(100),
		ERPcode: z.string().max(100),
		code: z.string().max(100),
		users: z.array(z.string().uuid()),
	})

	const { name, cnpj, email, fone, legalName, ERPcode, code, users } =
		updateSupplierBodySchema.parse(request.body)

	const { supplierId } = z
		.object({
			supplierId: z.string().uuid(),
		})
		.parse(request.params)

	try {
		const updateSupplier = makeUpdateSupplierUseCase()
		await updateSupplier.execute({
			id: supplierId,
			name,
			cnpj,
			email,
			fone,
			legalName,
			ERPCode: ERPcode,
			code,
			users,
		})

		return reply.status(204).send()
	} catch (error) {
		if (error instanceof SupplierNotFoundError) {
			return reply
				.status(error.statusCode)
				.send({ message: error.message })
		}
		reply.status(500).send()
	}
}

export const updateSupplierSchema = {
	tags: ["Fornecedores"],
	security: [{ BearerAuth: [] }],
	body: {
		type: "object",
		properties: {
			name: { type: "string" },
			cnpj: { type: "string" },
			email: { type: "string" },
			fone: { type: "string" },
			legalName: { type: "string" },
			ERPcode: { type: "string" },
			code: { type: "string" },
			users: {
				type: "array",
				items: {
					type: "string",
				},
			},
		},
		required: ["name", "cnpj", "legalName", "ERPcode", "code"],
	},
	params: {
		type: "object",
		properties: {
			supplierId: { type: "string" },
		},
		required: ["supplierId"],
	},
	response: {
		204: {
			type: "null",
			description: "Success",
		},
		404: {
			type: "object",
			description: "Not Found",
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
