import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middleware/verifyJwt';
import { createSection } from './create-section';
import { getSectionById } from './get-section-by-id';
import { listSections } from './list-sections';
import { updateSection } from './update-section';
import { updateSectionStatus } from './update-section-status';
import { createSectionType } from './types/create-section-type';
import { getSectionTypeById } from './types/get-section-type-by-id';
import { listSectionTypes } from './types/list-section-types';
import { updateSectionType } from './types/update-section-type';
import { deleteSectionType } from './types/delete-section-type';

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

    app.get('/section/types', { onRequest: verifyJwt }, listSectionTypes);
    app.post('/section/types/new', { onRequest: verifyJwt }, createSectionType);
    app.get('/section/types/:id', { onRequest: verifyJwt }, getSectionTypeById);
    app.patch(
        '/section/types/:id/edit',
        { onRequest: verifyJwt },
        updateSectionType
    );
    app.delete(
        '/section/types/:id/delete',
        { onRequest: verifyJwt },
        deleteSectionType
    );
}
