import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middleware/verifyJwt';
import { createProfile, createProfileSchema } from './create-profile';
import { listProfiles, listProfilesSchema } from './list-profiles';
import { getProfileById, getProfileByIdSchema } from './get-profile-by-id';
import { duplicateProfile, duplicateProfileSchema } from './duplicate-profile';
import {
    linkProfileToRoute,
    linkProfileToRouteSchema,
} from './link-profile-route';

export async function profileRoutes(app: FastifyInstance) {
    app.get(
        '/profiles',
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: listProfilesSchema,
        },
        listProfiles
    );
    app.get(
        '/profiles/:id',
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: getProfileByIdSchema,
        },
        getProfileById
    );
    app.post(
        '/profiles/:id/duplicate',
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: duplicateProfileSchema,
        },
        duplicateProfile
    );
    app.post(
        '/profiles/new',
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: createProfileSchema,
        },
        createProfile
    );
    app.post(
        '/profiles/:id/routes/:routeId/link',
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: linkProfileToRouteSchema,
        },
        linkProfileToRoute
    );
    app.post(
        '/profiles/:id/routes/:routeId/unlink',
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: linkProfileToRouteSchema,
        },
        linkProfileToRoute
    );
}
