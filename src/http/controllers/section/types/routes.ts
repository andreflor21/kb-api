import { verifyRouteAccess } from "@/http/middleware/routeAccess"
import { verifyJwt } from "@/http/middleware/verifyJwt"
import type { FastifyInstance } from "fastify"
import {
	createSectionType,
	createSectionTypeSchema,
} from "./create-section-type"
import {
	deleteSectionType,
	deleteSectionTypeSchema,
} from "./delete-section-type"
import {
	getSectionTypeById,
	getSectionTypeByIdSchema,
} from "./get-section-type-by-id"
import { listSectionTypes, listSectionTypesSchema } from "./list-section-types"
import {
	updateSectionType,
	updateSectionTypeSchema,
} from "./update-section-type"
export async function sectionTypesRoutes(app: FastifyInstance) {
	app.get(
		"/sections/types",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: listSectionTypesSchema,
		},
		listSectionTypes,
	)
	app.post(
		"/sections/types/new",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: createSectionTypeSchema,
		},
		createSectionType,
	)
	app.get(
		"/sections/types/:id",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: getSectionTypeByIdSchema,
		},
		getSectionTypeById,
	)
	app.patch(
		"/sections/types/:id/edit",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: updateSectionTypeSchema,
		},
		updateSectionType,
	)
	app.delete(
		"/sections/types/:id/delete",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: deleteSectionTypeSchema,
		},
		deleteSectionType,
	)
}
