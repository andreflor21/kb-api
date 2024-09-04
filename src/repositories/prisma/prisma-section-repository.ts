import { prisma } from '@/lib/prisma';
import { Prisma, Section } from '@prisma/client';
import { SectionsRepository } from '@/repositories/sections-repository';

export class PrismaSectionRepository implements SectionsRepository {
    async createSection(data: Prisma.SectionCreateInput): Promise<Section> {
        return prisma.section.create({ data });
    }

    async getSectionById(id: string): Promise<Section | null> {
        return prisma.section.findUnique({ where: { id } });
    }

    async getSections(): Promise<Section[]> {
        return prisma.section.findMany();
    }

    async updateSection(
        id: string,
        data: Prisma.SectionUpdateInput
    ): Promise<Section | null> {
        return prisma.section.update({ where: { id }, data });
    }

    async updateSectionStatus(id: string, status: boolean): Promise<void> {
        await prisma.section.update({
            where: { id },
            data: { active: status },
        });
    }

    async deleteSection(id: string): Promise<void> {
        await prisma.section.delete({ where: { id } });
    }
}
