import { prisma } from '@/lib/prisma';
import { Prisma, SectionType } from '@prisma/client';

import { SectionTypesRepository } from '../section-types-repository';

export class PrismaSectionTypesRepository implements SectionTypesRepository {
    async createSectionType(
        data: Prisma.SectionTypeCreateInput
    ): Promise<SectionType> {
        const sectionType = await prisma.sectionType.create({ data });
        return sectionType;
    }

    async getSectionTypeById(id: string): Promise<SectionType | null> {
        const sectionType = await prisma.sectionType.findUnique({
            where: { id },
        });
        if (!sectionType) return null;

        return sectionType;
    }

    async getSectionTypes(): Promise<SectionType[]> {
        const sectionTypes = await prisma.sectionType.findMany();

        return sectionTypes;
    }

    async updateSectionType(
        id: string,
        data: Prisma.SectionTypeUpdateInput
    ): Promise<SectionType | null> {
        const sectionType = await prisma.sectionType.update({
            where: { id },
            data,
        });

        if (!sectionType) return null;

        return sectionType;
    }

    async deleteSectionType(id: string): Promise<void> {
        await prisma.sectionType.delete({
            where: { id },
        });
    }
}
