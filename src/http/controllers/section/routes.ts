import { verifyRouteAccess } from "@/http/middleware/routeAccess"
import { verifyJwt } from "@/http/middleware/verifyJwt"
import type { FastifyInstance } from "fastify"
import { createSection, createSectionSchema } from "./create-section"
import { getSectionById, getSectionByIdSchema } from "./get-section-by-id"
import { listSections, listSectionsSchema } from "./list-sections"
import { sectionTypesRoutes } from "./types/routes"
import { updateSection, updateSectionSchema } from "./update-section"
import {
	updateSectionStatus,
	updateSectionStatusSchema,
} from "./update-section-status"

export async function sectionRoutes(app: FastifyInstance) {
	app.get(
		"/sections",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: listSectionsSchema,
		},
		listSections,
	)
	app.post(
		"/sections/new",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: createSectionSchema,
		},
		createSection,
	)
	app.get(
		"/sections/:id",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: getSectionByIdSchema,
		},
		getSectionById,
	)
	app.patch(
		"/sections/:id/edit",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: updateSectionSchema,
		},
		updateSection,
	)
	app.put(
		"/sections/:id/status",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: updateSectionStatusSchema,
		},
		updateSectionStatus,
	)

	app.register(sectionTypesRoutes)
}
