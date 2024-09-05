import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middleware/verifyJwt';
import { createSectionType } from './create-section-type';
import { getSectionTypeById } from './get-section-type-by-id';
import { listSectionTypes } from './list-section-types';
import { updateSectionType } from './update-section-type';
import { deleteSectionType } from './delete-section-type';
export async function sectionTypesRoutes(app: FastifyInstance) {
    app.get('/sections/types', { onRequest: verifyJwt }, listSectionTypes);
    app.post(
        '/sections/types/new',
        { onRequest: verifyJwt },
        createSectionType
    );
    app.get(
        '/sections/types/:id',
        { onRequest: verifyJwt },
        getSectionTypeById
    );
    app.patch(
        '/sections/types/:id/edit',
        { onRequest: verifyJwt },
        updateSectionType
    );
    app.delete(
        '/sections/types/:id/delete',
        { onRequest: verifyJwt },
        deleteSectionType
    );
}
