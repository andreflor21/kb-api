import * as fs from "node:fs"
import handlebars from "handlebars"
import * as nodemailer from "nodemailer"
import type Mail from "nodemailer/lib/mailer"

type EmailClientArgs<TemplateData> = {
	to: string
	subject: string
	templatePath: string
	templateData: TemplateData
}

export const sendMail = async <TemplateData>(
	data: EmailClientArgs<TemplateData>,
) => {
	const fromEmail = process.env.FROM_EMAIL
	const smtpHost = process.env.SMTP_HOST ?? ""
	const smtpPort = Number.parseInt(process.env.SMTP_PORT ?? "587", 10)
	const smtpUser = process.env.SMTP_USER ?? ""
	const smtpPassword = process.env.SMTP_PASSWORD ?? ""

	try {
		const smtpTransport: Mail = nodemailer.createTransport({
			host: smtpHost,
			port: smtpPort,
			auth: {
				user: smtpUser,
				pass: smtpPassword,
			},
		})

		const source = fs.readFileSync(data.templatePath, {
			encoding: "utf-8",
		})
		const template: HandlebarsTemplateDelegate<TemplateData> =
			handlebars.compile(source)
		const html: string = template(data.templateData)

		const updateData: Mail.Options = {
			to: data.to,
			html,
			from: `Equipe Kanban <${fromEmail}>`,
			subject: data.subject,
		}

		smtpTransport
			.sendMail(updateData)
			.then((result: nodemailer.SentMessageInfo): void => {
				// console.info(result);
			})
	} catch (error) {
		console.error(error)
	}
}
