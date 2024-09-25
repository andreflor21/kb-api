import AppError from "@/shared/errors/app-error"
import { makeCreateSupplierUseCase } from "@/use-cases/factories/supplier/make-create-supplier-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function createSupplier(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const createSupplierBodySchema = z.object({
		name: z.string().max(100),
		cnpj: z
			.string()
			.max(18)
			.optional()
			.transform((value) => (value ? value.replace(/\D/g, "") : value)),
		email: z.string().email().max(100).or(z.null()).optional(),
		fone: z.string().max(11).or(z.null()).optional(),
		legalName: z.string().max(100).optional(),
		ERPcode: z.string().max(100).optional(),
		code: z.string().max(100).optional(),
		users: z.array(z.string().uuid()).optional(),
	})

	const { name, cnpj, email, fone, legalName, ERPcode, code, users } =
		createSupplierBodySchema.parse(request.body)

	try {
		const createSupplier = makeCreateSupplierUseCase()

		const newSupplier = await createSupplier.execute({
			name,
			cnpj: cnpj ?? null,
			email: email ?? null,
			fone: fone ?? null,
			legalName: legalName ?? null,
			ERPCode: ERPcode ?? null,
			code: code ?? null,
			users: users ?? [],
		})

		return reply.status(201).send(newSupplier)
	} catch (error) {
		if (error instanceof AppError) {
			return reply
				.status(error.statusCode)
				.send({ message: error.message })
		}
		reply.status(500).send({ error })
	}
}

export const createSupplierSchema = {
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
			users: { type: "array", items: { type: "string" } },
		},
		required: ["name"],
	},
	response: {
		201: {
			type: "object",
			properties: {
				supplier: {
					type: "object",
					properties: {
						id: { type: "string" },
						name: { type: "string" },
						cnpj: { type: "string" },
						email: { type: "string" },
						fone: { type: "string" },
						legalName: { type: "string" },
						ERPcode: { type: "string" },
						code: { type: "string" },
						created_at: { type: "string", format: "date-time" },
						users: {
							type: "array",
							items: {
								type: "object",
								properties: {
									id: { type: "string" },
									name: { type: "string" },
								},
							},
						},
						addresses: {
							type: "array",
							items: {
								type: "object",
								properties: {
									id: { type: "string" },
									lograd: { type: "string" },
									number: { type: "string" },
									complement: { type: "string" },
									district: { type: "string" },
									city: { type: "string" },
									state: { type: "string" },
									cep: { type: "string" },
								},
							},
						},
					},
				},
			},
		},
		400: {
			type: "object",
			properties: {
				message: { type: "string" },
			},
		},
	},
}
