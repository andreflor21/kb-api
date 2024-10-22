import { verifyRouteAccess } from "@/http/middleware/routeAccess"
import { verifyJwt } from "@/http/middleware/verifyJwt"
import type { FastifyInstance } from "fastify"
import { createProduct, createProductSchema } from "./create-product"
import { deleteProduct, deleteProductSchema } from "./delete-product"
import { getProductById, getProductByIdSchema } from "./get-product-by-id"
import { productGroupsRoutes } from "./groups/routes"
import { listProducts, listProductsSchema } from "./list-products"
import { productTypesRoutes } from "./types/routes"
import { updateProduct, updateProductSchema } from "./update-product"
import {
	updateProductStatus,
	updateProductStatusSchema,
} from "./update-product-status"

export async function productsRoutes(app: FastifyInstance) {
	const prefix = "/products"
	app.post(
		`${prefix}/new`,
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: createProductSchema,
		},
		createProduct,
	)

	app.get(
		`${prefix}/:id`,
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: getProductByIdSchema,
		},
		getProductById,
	)

	app.get(
		prefix,
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: listProductsSchema,
		},
		listProducts,
	)

	app.patch(
		`${prefix}/:id/update`,
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: updateProductSchema,
		},
		updateProduct,
	)

	app.put(
		`${prefix}/:id/status`,
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: updateProductStatusSchema,
		},
		updateProductStatus,
	)

	app.delete(
		`${prefix}/:id/delete`,
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: deleteProductSchema,
		},
		deleteProduct,
	)

	app.register(productTypesRoutes, { prefix })
	app.register(productGroupsRoutes, { prefix })
}
