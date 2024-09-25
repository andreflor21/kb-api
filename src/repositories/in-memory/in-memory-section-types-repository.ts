import { randomUUID } from "node:crypto"
import type { Prisma, SectionType } from "@prisma/client"
import type { SectionTypesRepository } from "../section-types-repository"

export class InMemorySectionTypesRepository implements SectionTypesRepository {
	private sectionTypes: SectionType[] = []

	public async createSectionType(
		data: Prisma.SectionTypeCreateInput,
	): Promise<SectionType> {
		const newSectionType: SectionType = {
			id: randomUUID(),
			description: data.description,
			abrev: data.abrev ?? null,
		}

		this.sectionTypes.push(newSectionType)

		return newSectionType
	}

	public async getSectionTypes(): Promise<SectionType[]> {
		return this.sectionTypes
	}

	public async getSectionTypeById(id: string): Promise<SectionType | null> {
		const sectionType = this.sectionTypes.find(
			(sectionType) => sectionType.id === id,
		)

		return sectionType ? sectionType : null
	}

	public async updateSectionType(
		id: string,
		data: Prisma.SectionTypeUpdateInput,
	): Promise<SectionType | null> {
		const findSectionType = this.sectionTypes.find(
			(sectionType) => sectionType.id === id,
		)

		if (findSectionType) {
			findSectionType.description =
				(data.description as string) ?? findSectionType.description
			findSectionType.abrev =
				(data.abrev as string) ?? findSectionType.abrev
			this.sectionTypes[this.sectionTypes.map((x) => x.id).indexOf(id)] =
				findSectionType
			return findSectionType
		}
		return null
	}

	public async deleteSectionType(id: string): Promise<void> {
		this.sectionTypes = this.sectionTypes.filter(
			(sectionType) => sectionType.id !== id,
		)
	}
}
