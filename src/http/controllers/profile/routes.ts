import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middleware/verifyJwt';
import { createProfile } from './create-profile';
import { listProfiles } from './list-profiles';
import { getProfileById } from './get-profile-by-id';
import { duplicateProfile } from './duplicate-profile';
import { linkProfileToRoute } from './link-profile-route';

export async function profileRoutes(app: FastifyInstance) {
    app.get('/profiles', { onRequest: verifyJwt }, listProfiles);
    app.get('/profiles/:id', { onRequest: verifyJwt }, getProfileById);
    app.get('/profiles/duplicate', { onRequest: verifyJwt }, duplicateProfile);
    app.post('/profiles/new', { onRequest: verifyJwt }, createProfile);
    app.post(
        '/profiles/:id/routes/:routeId/link',
        { onRequest: verifyJwt },
        linkProfileToRoute
    );
    app.post(
        '/profiles/:id/routes/:routeId/unlink',
        { onRequest: verifyJwt },
        linkProfileToRoute
    );
}
