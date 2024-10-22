import { verifyRouteAccess } from "@/http/middleware/routeAccess"
import { verifyJwt } from "@/http/middleware/verifyJwt"
import type { FastifyInstance } from "fastify"
import multer from "fastify-multer"
import { addressRoutes } from "./address/routes"
import { createSupplier, createSupplierSchema } from "./create-supplier"
import { deleteSupplier, deleteSupplierSchema } from "./delete-supplier"
import { deliveryDaysRoutes } from "./delivery-days/routes"
import { exportSupplier } from "./export-supplier"
import { getSupplierById, getSupplierByIdSchema } from "./get-supplier-by-id"
import { importSuppliers, importSuppliersSchema } from "./import-suppliers"
import {
	listSupplierProducts,
	listSupplierProductsSchema,
} from "./list-supplier-products"
import { listSuppliers, listSuppliersSchema } from "./list-suppliers"
import { updateSupplier, updateSupplierSchema } from "./update-supplier"
import {
	updateSupplierStatus,
	updateSupplierStatusSchema,
} from "./update-supplier-status"

export async function supplierRoutes(app: FastifyInstance) {
	const prefix = "/suppliers"
	const upload = multer({ dest: "uploads/" })
	app.get(
		prefix,
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: listSuppliersSchema,
		},
		listSuppliers,
	)
	app.post(
		`${prefix}/new`,
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: createSupplierSchema,
		},
		createSupplier,
	)
	app.get(
		`${prefix}/:supplierId`,
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: getSupplierByIdSchema,
		},
		getSupplierById,
	)
	app.get(
		`${prefix}/:supplierId/products`,
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: listSupplierProductsSchema,
		},
		listSupplierProducts,
	)

	app.patch(
		`${prefix}/:supplierId/edit`,
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: updateSupplierSchema,
		},
		updateSupplier,
	)
	app.delete(
		`${prefix}/:supplierId/delete`,
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: deleteSupplierSchema,
		},
		deleteSupplier,
	)
	app.put(
		`${prefix}/:supplierId/status`,
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: updateSupplierStatusSchema,
		},
		updateSupplierStatus,
	)

	app.post(
		`${prefix}/import`,
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: importSuppliersSchema,
			preHandler: upload.single("file"),
		},
		importSuppliers,
	)
	app.get(
		`${prefix}/export`,
		{
			onRequest: [verifyJwt],
			schema: { tags: ["Fornecedores"] },
		},
		exportSupplier,
	)
	app.register(addressRoutes, { prefix })
	app.register(deliveryDaysRoutes, { prefix })
}
