import { format } from "fast-csv"
import type { FastifyReply, FastifyRequest } from "fastify"

export const exportSupplier = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const headers = [
		"Nome", // name
		"CNPJ", // cnpj
		"E-mail", // email
		"Telefone", // fone
		"Razão Social", // legalName
		"Código ERP", // ERPcode
		"Código", // code
	]

	// Definindo o conteúdo CSV
	const csvStream = format({ headers: true })
	csvStream.write({
		Nome: "",
		CNPJ: "",
		"E-mail": "",
		Telefone: "",
		"Razão Social": "",
		"Código ERP": "",
		Código: "",
	})
	csvStream.end()

	// Configurando o cabeçalho da resposta para exportar o arquivo CSV
	reply.header("Content-Type", "text/csv")
	reply.header(
		"Content-Disposition",
		'attachment; filename="fornecedores_template.csv"',
	)

	// Enviando o CSV na resposta
	return reply.status(200).send(csvStream)
}
