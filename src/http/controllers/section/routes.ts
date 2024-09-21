import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middleware/verifyJwt';
import { createSection, createSectionSchema } from './create-section';
import { getSectionById, getSectionByIdSchema } from './get-section-by-id';
import { listSections, listSectionsSchema } from './list-sections';
import { updateSection, updateSectionSchema } from './update-section';
import {
    updateSectionStatus,
    updateSectionStatusSchema,
} from './update-section-status';
import { sectionTypesRoutes } from './types/routes';

export async function sectionRoutes(app: FastifyInstance) {
    app.get(
        '/sections',
        { onRequest: verifyJwt, schema: listSectionsSchema },
        listSections
    );
    app.post(
        '/sections/new',
        { onRequest: verifyJwt, schema: createSectionSchema },
        createSection
    );
    app.get(
        '/sections/:id',
        { onRequest: verifyJwt, schema: getSectionByIdSchema },
        getSectionById
    );
    app.patch(
        '/sections/:id/edit',
        { onRequest: verifyJwt, schema: updateSectionSchema },
        updateSection
    );
    app.put(
        '/sections/:id/status',
        { onRequest: verifyJwt, schema: updateSectionStatusSchema },
        updateSectionStatus
    );

    app.register(sectionTypesRoutes);
}
