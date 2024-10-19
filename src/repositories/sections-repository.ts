import type { Prisma, Section } from "@prisma/client"

export interface SectionsRepository {
	createSection(data: Prisma.SectionCreateInput): Promise<Section>
	getSectionById(id: string): Promise<Section | null>
	getSections(): Promise<Section[]>
	updateSection(
		id: string,
		data: Prisma.SectionUpdateInput,
	): Promise<Section | null>
	updateSectionStatus(id: string, status: boolean): Promise<void>
	deleteSection(id: string): Promise<void>
	// Adicione outros métodos necessários aqui
}
