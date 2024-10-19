import { verifyRouteAccess } from "@/http/middleware/routeAccess"
import { verifyJwt } from "@/http/middleware/verifyJwt"
import type { FastifyInstance } from "fastify"
import { createRoute, createRouteSchema } from "./create-route"
import { getRouteById, getRouteByIdSchema } from "./get-route-by-id"
import { listRoutes, listRoutesSchema } from "./list-routes"
import { updateRoute, updateRouteSchema } from "./update-route"

export async function routesRoutes(app: FastifyInstance) {
	app.get(
		"/routes",
		{ onRequest: [verifyJwt, verifyRouteAccess], schema: listRoutesSchema },
		listRoutes,
	)
	app.post(
		"/routes/new",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: createRouteSchema,
		},
		createRoute,
	)
	app.get(
		"/routes/:id",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: getRouteByIdSchema,
		},
		getRouteById,
	)
	app.patch(
		"/routes/:id/edit",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: updateRouteSchema,
		},
		updateRoute,
	)
}
