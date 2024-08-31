import { Prisma, Section } from '@prisma/client';
import { SectionsRepository } from '@/repositories/sections-repository';
import { randomUUID } from 'crypto';

export class InMemorySectionsRepository implements SectionsRepository {
    private sections: Section[] = [];

    async createSection(data: Prisma.SectionCreateInput): Promise<Section> {
        const section = {
            ...data,
            id: randomUUID(),
            sectionTypeId: data.sectionType.connect?.id ?? randomUUID(),
            active: true,
            ERPcode: data.ERPcode ?? null,
        };
        this.sections.push(section);
        return section;
    }

    async getSectionById(id: string): Promise<Section | null> {
        return this.sections.find((section) => section.id === id) || null;
    }

    async getSections(): Promise<Section[]> {
        return this.sections;
    }

    async updateSection(
        id: string,
        data: Prisma.SectionUpdateInput
    ): Promise<Section | null> {
        const findSection = this.sections.find((section) => section.id == id);

        if (findSection) {
            findSection.description =
                (data.description as string) ?? findSection.description;
            findSection.code = (data.code as string) ?? findSection.code;
            findSection.branchMatrixCode =
                (data.branchMatrixCode as string) ??
                findSection.branchMatrixCode;
            findSection.ERPcode =
                (data.ERPcode as string) ?? findSection.ERPcode;
            findSection.sectionTypeId =
                (data.sectionType?.connect?.id as string) ??
                findSection.sectionTypeId;

            this.sections[this.sections.map((x) => x.id).indexOf(id)] =
                findSection;
            return findSection;
        } else {
            return null;
        }
    }

    async updateSectionStatus(id: string, status: boolean): Promise<void> {
        const sectionIndex = this.sections.findIndex(
            (section) => section.id === id
        );
        if (sectionIndex === -1) return;

        this.sections[sectionIndex].active = status;
    }

    async deleteSection(id: string): Promise<void> {
        this.sections = this.sections.filter((section) => section.id !== id);
    }
}
