import { verifyRouteAccess } from "@/http/middleware/routeAccess"
import { verifyJwt } from "@/http/middleware/verifyJwt"
import type { FastifyInstance } from "fastify"
import { createProductType, createProductTypeSchema } from "./create-type"
import { deleteProductType, deleteProductTypeSchema } from "./delete-type"
import { updateProductType, updateProductTypeSchema } from "./update-type"
import { listProductTypes, listProductTypesSchema } from "./list-types"

export async function productTypesRoutes(app: FastifyInstance) {
	const prefix = "/types"
	app.post(
		`${prefix}/new`,
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: createProductTypeSchema,
		},
		createProductType,
	)

	app.get(
		prefix,
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: listProductTypesSchema,
		},
		listProductTypes,
	)

	app.patch(
		`${prefix}/:id/edit`,
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: updateProductTypeSchema,
		},
		updateProductType,
	)

	app.delete(
		`${prefix}/:id/delete`,
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: deleteProductTypeSchema,
		},
		deleteProductType,
	)
}
