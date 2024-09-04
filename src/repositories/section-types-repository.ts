import { Prisma, SectionType } from '@prisma/client';

export interface SectionTypesRepository {
    createSectionType(
        data: Prisma.SectionTypeCreateInput
    ): Promise<SectionType>;
    getSectionTypeById(id: string): Promise<SectionType | null>;
    getSectionTypes(): Promise<SectionType[]>;
    updateSectionType(
        id: string,
        data: Prisma.SectionTypeUpdateInput
    ): Promise<SectionType | null>;
    deleteSectionType(id: string): Promise<void>;
    // Adicione outros métodos necessários aqui
}
