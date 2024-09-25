import { verifyRouteAccess } from "@/http/middleware/routeAccess"
import { verifyJwt } from "@/http/middleware/verifyJwt"
import type { FastifyInstance } from "fastify"
import { createProfile, createProfileSchema } from "./create-profile"
import { deleteProfile, deleteProfileSchema } from "./delete-profile"
import { duplicateProfile, duplicateProfileSchema } from "./duplicate-profile"
import { getProfileById, getProfileByIdSchema } from "./get-profile-by-id"
import {
	linkProfileToRoute,
	linkProfileToRouteSchema,
} from "./link-profile-route"
import { listProfiles, listProfilesSchema } from "./list-profiles"
import { updateProfile, updateProfileSchema } from "./update-profile"

export async function profileRoutes(app: FastifyInstance) {
	app.get(
		"/profiles",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: listProfilesSchema,
		},
		listProfiles,
	)
	app.get(
		"/profiles/:id",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: getProfileByIdSchema,
		},
		getProfileById,
	)
	app.patch(
		"/profiles/:id/edit",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: updateProfileSchema,
		},
		updateProfile,
	)
	app.delete(
		"/profiles/:id/delete",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: deleteProfileSchema,
		},
		deleteProfile,
	)
	app.post(
		"/profiles/:id/duplicate",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: duplicateProfileSchema,
		},
		duplicateProfile,
	)
	app.post(
		"/profiles/new",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: createProfileSchema,
		},
		createProfile,
	)
	app.post(
		"/profiles/:id/routes/:routeId/link",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: linkProfileToRouteSchema,
		},
		linkProfileToRoute,
	)
	app.post(
		"/profiles/:id/routes/:routeId/unlink",
		{
			onRequest: [verifyJwt, verifyRouteAccess],
			schema: linkProfileToRouteSchema,
		},
		linkProfileToRoute,
	)
}
