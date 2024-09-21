import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middleware/verifyJwt';
import {
    createSectionType,
    createSectionTypeSchema,
} from './create-section-type';
import {
    getSectionTypeById,
    getSectionTypeByIdSchema,
} from './get-section-type-by-id';
import { listSectionTypes, listSectionTypesSchema } from './list-section-types';
import {
    updateSectionType,
    updateSectionTypeSchema,
} from './update-section-type';
import {
    deleteSectionType,
    deleteSectionTypeSchema,
} from './delete-section-type';
export async function sectionTypesRoutes(app: FastifyInstance) {
    app.get(
        '/sections/types',
        { onRequest: verifyJwt, schema: listSectionTypesSchema },
        listSectionTypes
    );
    app.post(
        '/sections/types/new',
        { onRequest: verifyJwt, schema: createSectionTypeSchema },
        createSectionType
    );
    app.get(
        '/sections/types/:id',
        { onRequest: verifyJwt, schema: getSectionTypeByIdSchema },
        getSectionTypeById
    );
    app.patch(
        '/sections/types/:id/edit',
        { onRequest: verifyJwt, schema: updateSectionTypeSchema },
        updateSectionType
    );
    app.delete(
        '/sections/types/:id/delete',
        { onRequest: verifyJwt, schema: deleteSectionTypeSchema },
        deleteSectionType
    );
}
