import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middleware/verifyJwt';
import { createSection, createSectionSchema } from './create-section';
import { getSectionById, getSectionByIdSchema } from './get-section-by-id';
import { listSections, listSectionsSchema } from './list-sections';
import { updateSection, updateSectionSchema } from './update-section';
import { verifyRouteAccess } from '@/http/middleware/routeAccess';
import {
    updateSectionStatus,
    updateSectionStatusSchema,
} from './update-section-status';
import { sectionTypesRoutes } from './types/routes';

export async function sectionRoutes(app: FastifyInstance) {
    app.get(
        '/sections',
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: listSectionsSchema,
        },
        listSections
    );
    app.post(
        '/sections/new',
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: createSectionSchema,
        },
        createSection
    );
    app.get(
        '/sections/:id',
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: getSectionByIdSchema,
        },
        getSectionById
    );
    app.patch(
        '/sections/:id/edit',
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: updateSectionSchema,
        },
        updateSection
    );
    app.put(
        '/sections/:id/status',
        {
            onRequest: [verifyJwt, verifyRouteAccess],
            schema: updateSectionStatusSchema,
        },
        updateSectionStatus
    );

    app.register(sectionTypesRoutes);
}
