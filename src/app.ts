import env from "@/env"
import fastifyCookie from "@fastify/cookie"
import cors from "@fastify/cors"
import fastifyJwt from "@fastify/jwt"
import fastifyMultipart from "@fastify/multipart"
import rateLimit from "@fastify/rate-limit"
import { fastifySwagger } from "@fastify/swagger"
import { fastifySwaggerUi } from "@fastify/swagger-ui"
import { Prisma } from "@prisma/client"
import fastify from "fastify"
import { ZodError } from "zod"
import { productsRoutes } from "./http/controllers/products/routes"
import { profileRoutes } from "./http/controllers/profile/routes"
import { routesRoutes } from "./http/controllers/routes/routes"
import { sectionRoutes } from "./http/controllers/section/routes"
import { supplierRoutes } from "./http/controllers/supplier/routes"
import { userRoutes } from "./http/controllers/user/routes"
import { swaggerOptions, swaggerUiOptions } from "./shared/docs/swagger"

export const app = fastify({
	logger: {
		level: "info", // Log level (you can use 'debug' for more detailed logs)
		serializers: {
			req(req) {
				return {
					method: req.method,
					url: req.url,
					headers: req.headers,
				}
			},
			res(res) {
				return {
					statusCode: res.statusCode,
				}
			},
		},
	},
})

app.register(rateLimit, {
	max: 100,
	timeWindow: "1 minute",
	keyGenerator: (req) => {
		return req.ip
	},
	errorResponseBuilder: (req, context) => {
		return {
			statusCode: 429,
			error: "Too Many Requests",
			message:
				"You have reached the maximum number of requests allowed in one minute.",
		}
	},
})
app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	sign: {
		expiresIn: "1d",
	},
})
app.register(cors, {})
app.register(fastifyMultipart)

try {
	app.register(fastifySwagger, swaggerOptions)
	app.register(fastifySwaggerUi, swaggerUiOptions)
} catch (error) {
	console.error("Error with Swagger registration:", error)
}

app.register(fastifyCookie)
/* Rotas */
app.register(userRoutes)
app.register(profileRoutes)
app.register(routesRoutes)
app.register(sectionRoutes)
app.register(supplierRoutes)
app.register(productsRoutes)

app.setErrorHandler((error, _, reply) => {
	console.log(error)
	if (error instanceof ZodError) {
		return reply.status(400).send({
			message: "Validation error.",
			errors: error.format()._errors.join(", "),
		})
	}
	if (error instanceof Prisma.PrismaClientValidationError) {
		return reply
			.status(400)
			.send({ message: "Validation error.", errors: error.message })
	}

	if (env.NODE_ENV !== "production") {
		return reply
			.status(error.statusCode ?? 400)
			.send({ message: error.message, errors: error.stack ?? null })
	}

	return reply
		.status(500)
		.send({ message: "Internal server error.", errors: null })
})
