import { verifyRouteAccess } from "@/http/middleware/routeAccess"
import { verifyJwt } from "@/http/middleware/verifyJwt"
import type { FastifyInstance } from "fastify"
import { createProductGroup, createProductGroupSchema } from "./create-group"
import { deleteProductGroup, deleteProductGroupSchema } from "./delete-group"
import { listProductGroup, listProductGroupSchema } from "./list-group"
import { updateProductGroup, updateProductGroupSchema } from "./update-group"

export async function productGroupsRoutes(app: FastifyInstance) {
	const prefix = "/groups"
	app.post(
		`${prefix}/new`,
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: createProductGroupSchema,
		},
		createProductGroup,
	)
	app.get(
		prefix,
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: listProductGroupSchema,
		},
		listProductGroup,
	)
	app.patch(
		`${prefix}/:id/edit`,
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: updateProductGroupSchema,
		},
		updateProductGroup,
	)
	app.delete(
		`${prefix}/:id/delete`,
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: deleteProductGroupSchema,
		},
		deleteProductGroup,
	)
}
