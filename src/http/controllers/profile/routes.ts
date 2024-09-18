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
        { onRequest: verifyJwt, schema: listProfilesSchema },
        listProfiles
    );
    app.get(
        '/profiles/:id',
        { onRequest: verifyJwt, schema: getProfileByIdSchema },
        getProfileById
    );
    app.post(
        '/profiles/duplicate',
        { onRequest: verifyJwt, schema: duplicateProfileSchema },
        duplicateProfile
    );
    app.post(
        '/profiles/new',
        { onRequest: verifyJwt, schema: createProfileSchema },
        createProfile
    );
    app.post(
        '/profiles/:id/routes/:routeId/link',
        { onRequest: verifyJwt, schema: linkProfileToRouteSchema },
        linkProfileToRoute
    );
    app.post(
        '/profiles/:id/routes/:routeId/unlink',
        { onRequest: verifyJwt, schema: linkProfileToRouteSchema },
        linkProfileToRoute
    );
}
