import { prisma } from "@/lib/prisma"
import type { SectionsRepository } from "@/repositories/sections-repository"
import type { Prisma, Section } from "@prisma/client"

export class PrismaSectionRepository implements SectionsRepository {
	async createSection(data: Prisma.SectionCreateInput): Promise<Section> {
		return prisma.section.create({ data })
	}

	async getSectionById(id: string): Promise<Section | null> {
		return prisma.section.findUnique({ where: { id } })
	}

	async getSections(skip: number, take: number): Promise<Section[]> {
		return prisma.section.findMany({ skip, take })
	}

	async updateSection(
		id: string,
		data: Prisma.SectionUpdateInput,
	): Promise<Section | null> {
		return prisma.section.update({ where: { id }, data })
	}

	async updateSectionStatus(id: string, status: boolean): Promise<void> {
		await prisma.section.update({
			where: { id },
			data: { active: status },
		})
	}

	async deleteSection(id: string): Promise<void> {
		await prisma.section.delete({ where: { id } })
	}

	async countSections(): Promise<number> {
		return prisma.section.count()
	}
}
