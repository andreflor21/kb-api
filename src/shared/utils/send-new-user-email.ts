import { randomUUID } from "node:crypto"
import path from "node:path"
import { sendMail } from "@/shared/email/SendEmail"
import { UserNotFoundError } from "@/shared/errors/user-not-found-error"
import { makeUpdateTokenUseCase } from "@/use-cases/factories/user/make-update-token-use-case"

type TemplateCreatePassword = {
	name: string
	url: string
	token: string
}

type SendNewUserEmailArgs = {
	id: string
	email: string
	name: string
}
export const sendNewUserEmail = async ({
	id,
	email,
	name,
}: SendNewUserEmailArgs) => {
	try {
		const updateToken = makeUpdateTokenUseCase()
		const token = randomUUID()
		const expireDate = new Date()
		expireDate.setHours(expireDate.getHours() + 2)

		await updateToken.execute({ id, token, date: expireDate })

		const templateData: TemplateCreatePassword = {
			name,
			url: `${
				process.env.APP_URL ?? "http://localhost:3000"
			}/reset-password/${token}?type=new-user`,
			token,
		}
		sendMail<TemplateCreatePassword>({
			subject:
				"Bem vindo a plataforma! Ative sua conta e defina sua senha",
			templateData,
			templatePath: path.join(
				__dirname,
				"../../shared/email/welcomeEmail.html",
			),
			to: email,
		})

		return {
			message: `Email enviado com sucesso para ${email}`,
			token,
			expires: expireDate,
			statusCode: 200,
		}
	} catch (error) {
		if (error instanceof UserNotFoundError)
			return { message: error.message, statusCode: error.statusCode }

		return { message: "Erro interno", statusCode: 500 }
	}
}
