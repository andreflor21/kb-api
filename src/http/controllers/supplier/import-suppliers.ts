import fs from "node:fs"
import path from "node:path"
import { parse } from "fast-csv"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { makeImportSuppliersUseCase } from "@/use-cases/factories/supplier/make-import-suppliers-use-case"

export const importSuppliers = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const importSchema = z.object({
		name: z.string().max(100),
		cnpj: z.string().max(14).optional(),
		email: z.string().email().max(100).or(z.null()).optional(),
		fone: z.string().max(11).or(z.null()).optional(),
		legalName: z.string().max(100).optional(),
		ERPcode: z.string().max(100).optional(),
		code: z.string().max(100).optional(),
	})
	const file = (request as any).file

	if (!file) {
		return reply
			.status(400)
			.send({ message: "Nenhum arquivo foi enviado." })
	}
	const importSuppliers = makeImportSuppliersUseCase()
	const filePath = path.resolve(file.path)
	const results: Array<any> = []

	// Lendo e validando o CSV
	const stream = fs
		.createReadStream(filePath)
		.pipe(parse({ headers: true }))
		.on("error", (error) => {
			console.error(error)
			reply.status(500).send({ message: "Erro ao processar o arquivo." })
		})
		.on("data", (row) => {
			// Mapeia os cabeçalhos do CSV para os campos do schema
			const parsedRow = {
				name: row.Nome,
				cnpj: row.CNPJ,
				email: row["E-mail"],
				fone: row.Telefone,
				legalName: row["Razão Social"],
				ERPcode: row["Código ERP"],
				code: row.Código,
			}

			// Valida os dados com Zod
			const validation = importSchema.safeParse(parsedRow)

			if (!validation.success) {
				console.error(validation.error)
			} else {
				results.push(validation.data)
			}
		})
		.on("end", async () => {
			// Após o processamento, insere os dados no banco
			try {
				await importSuppliers.execute({ suppliers: results })

				// Retorna a resposta de sucesso
				reply.status(200).send({
					message: "Dados importados com sucesso!",
					data: results,
				})
			} catch (error) {
				console.error(error)
				reply
					.status(500)
					.send({ message: "Erro ao inserir dados no banco." })
			}

			// Remove o arquivo após o processamento
			fs.unlinkSync(filePath)
		})
}

export const importSuppliersSchema = {
	tags: ["Fornecedores"],
	security: [{ BearerAuth: [] }],
	summary: "Importar fornecedores via planilha",
	description: "Importar fornecedores via planilha",
	consumes: ["multipart/form-data"],
	body: {
		type: "object",
		properties: {
			file: { type: "string", format: "binary" },
		},
		required: ["file"],
	},
}
