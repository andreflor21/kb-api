import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middleware/verifyJwt';
import { createSection } from './create-section';
import { getSectionById } from './get-section-by-id';
import { listSections } from './list-sections';
import { updateSection } from './update-section';
import { updateSectionStatus } from './update-section-status';
import { sectionTypesRoutes } from './types/routes';

export async function sectionRoutes(app: FastifyInstance) {
    app.get('/sections', { onRequest: verifyJwt }, listSections);
    app.post('/sections/new', { onRequest: verifyJwt }, createSection);
    app.get('/sections/:id', { onRequest: verifyJwt }, getSectionById);
    app.patch('/sections/:id/edit', { onRequest: verifyJwt }, updateSection);
    app.put(
        '/sections/:id/status',
        { onRequest: verifyJwt },
        updateSectionStatus
    );

    app.register(sectionTypesRoutes);
}
