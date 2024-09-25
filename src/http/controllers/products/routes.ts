import { verifyRouteAccess } from "@/http/middleware/routeAccess"
import { verifyJwt } from "@/http/middleware/verifyJwt"
import type { FastifyInstance } from "fastify"
import { createProduct, createProductSchema } from "./create-product"

export async function productsRoutes(app: FastifyInstance) {
	app.post(
		"/products/new",
		{ onRequest: [verifyJwt], schema: createProductSchema },
		createProduct,
	)
}
